// utils/staticProps.ts
interface FetchConfig {
  url: string;
  key: string;
  defaultData?: any;
  requestOptions?: RequestInit;
}

interface ErrorResponse {
  message: string;
  code: string;
}

interface StaticPropsResult {
  props: {
    [key: string]: any;
    error: ErrorResponse | null;
  };
  revalidate: number;
}

const fetchWithTimeout = async (url: string, requestOptions?: RequestInit, timeout = 50000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...requestOptions, signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const getStaticPropsWithErrorHandling = async (
  fetchConfigs: FetchConfig[],
): Promise<StaticPropsResult> => {
  // Initialize default response
  const defaultProps: { [key: string]: any } = {
    error: null
  };

  try {
    // Validate environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SEO_LINK',
      'NEXT_PUBLIC_SD_API',
      'NEXT_PUBLIC_API_TOKEN'
    ];

    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    }

    // Create array of fetch promises
    const fetchPromises = fetchConfigs.map(config =>
      fetchWithTimeout(config.url, config.requestOptions)
    );

    // Fetch all data in parallel
    const responses = await Promise.allSettled(fetchPromises);
    let error: ErrorResponse | null = null;

    // Process each response
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const config = fetchConfigs[i];
      error = null;

      if (response.status === 'fulfilled' && response.value.ok) {
        try {
          const data = await response.value.json();
          defaultProps[config.key] = data;
        } catch (e) {
          console.error(`${config.key} JSON parsing error:`, e);
          defaultProps[config.key] = config.defaultData;
          error = {
            message: 'Failed to parse data. Please try again later.',
            code: 'JSON_PARSE_ERROR'
          };
        }
      } else {
        console.error(`${config.key} fetch failed:`,
          response.status === 'rejected' ? response.reason : response.value?.statusText);
        defaultProps[config.key] = config.defaultData;
        error = {
          message: 'Please try again later.',
          code: 'FETCH_ERROR'
        };
      }
    }

    return {
      props: { ...defaultProps, error: error },
      revalidate: 10
    };

  } catch (error) {
    console.error('getStaticProps error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    // Set default values for all configs
    fetchConfigs.forEach(config => {
      defaultProps[config.key] = config.defaultData;
    });

    return {
      props: {
        ...defaultProps,
        error: {
          message: 'Failed to load data. Please try again later.',
          code: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
        }
      },
      revalidate: 5
    };
  }
};