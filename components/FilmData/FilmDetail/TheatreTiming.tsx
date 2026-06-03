import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type ShowTime = {
  order_date?: string; // YYYY-MM-DD
  start_at?: string;
  booking_link?: string;
};

type Theatre = {
  title: string;
  address?: string;
  miles_distance: string;
  show_times?: ShowTime[];
};

type ShowTimeResponse = {
  showTime_datetime?: string;
  error?: string;
  showtime_list?: Theatre[];
};

type Props = {
  data: any;
  film_id: string | number;
  mdetailshow?: boolean;
};

const normalizeZip = (value: unknown) => {
  const digits = String(value ?? '').replace(/\D/g, '').slice(0, 6);
  return digits;
};

const TheatreTiming: React.FC<Props> = ({ data, film_id }) => {
  const releaseDate = useMemo(() => {
    const raw = data?.release_date ?? '';
    const first = typeof raw === 'string' && raw.includes('|') ? raw.split('|')[0] : raw;
    return new Date(first);
  }, [data?.release_date]);

  const dates = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        labelDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        labelDay: d.toLocaleDateString('en-US', { weekday: 'short' }),
        apiDate: d.toISOString().split('T')[0],
      };
    });
  }, []);

  const [selectedApiDate, setSelectedApiDate] = useState<string>(dates[0]?.apiDate ?? '');
  const selectedLabelDate = useMemo(() => {
    const found = dates.find((d) => d.apiDate === selectedApiDate);
    return found?.labelDate ?? '';
  }, [dates, selectedApiDate]);

  const [showTimeData, setShowTimeData] = useState<ShowTimeResponse | null>(null);
  const [showTimeDataLoaded, setShowTimeDataLoaded] = useState(false);
  const [showtimeError, setShowtimeError] = useState<string | null>(null);

  const [userPincode, setUserPincode] = useState('');
  const [displayShowTime, setDisplayShowTime] = useState(true);

  const [selectedTheatreTitle, setSelectedTheatreTitle] = useState<string>('');

  const theatres = (showTimeData?.showtime_list ?? []) as Theatre[];
  const activeTheatreData = useMemo(() => {
    if (!showTimeDataLoaded) return null;
    if (!selectedTheatreTitle) return null;
    return theatres.find((t) => t.title === selectedTheatreTitle) ?? null;
  }, [showTimeDataLoaded, theatres, selectedTheatreTitle]);

  const hasNoData = useMemo(() => {
    if (!showTimeDataLoaded) return false;
    if (showtimeError) return true;
    return theatres.length === 0;
  }, [showTimeDataLoaded, showtimeError, theatres.length]);

  const loadShowTimeZipData = async (pinRaw: unknown, apiDate: string) => {
    const pin = normalizeZip(pinRaw);
    if (!pin) {
      setShowtimeError('No ZIP provided');
      setShowTimeDataLoaded(true);
      setShowTimeData(null);
      setSelectedTheatreTitle('');
      return;
    }

    setShowTimeDataLoaded(false);
    setShowtimeError(null);

    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_SD_API +
        '/curated_showtime/movie_date_wise_showtime.php?url=' +
        process.env.NEXT_PUBLIC_BACKEND_URL +
        '/film-detail/' +
        film_id +
        '&id=' +
        data?.imbd_id +
        '&api_token=' +
        process.env.NEXT_PUBLIC_API_TOKEN +
        '&pincode=' +
        pin +
        '&show_date=' +
        apiDate
      );

      const payload: ShowTimeResponse = res?.data ?? {};
      setShowTimeData(payload);

      const list: Theatre[] = Array.isArray(payload?.showtime_list) ? payload.showtime_list : [];
      const err = payload?.error ? String(payload.error) : null;
      setShowtimeError(err);

      if (err || list.length === 0) {
        setSelectedTheatreTitle('');
        setShowTimeDataLoaded(true);
        return;
      }

      list.sort((a, b) => ((parseFloat(a.miles_distance) ?? 0) < parseFloat((b.miles_distance) ?? 0) ? -1 : 1));
      setSelectedTheatreTitle(list[0]?.title ?? '');
      setShowTimeDataLoaded(true);
    } catch (e) {
      setShowtimeError('Failed to load showtimes');
      setShowTimeDataLoaded(true);
      setSelectedTheatreTitle('');
      setShowTimeData(null);
    }
  };

  useEffect(() => {

    const dateDiff = (Date.now() - releaseDate.getTime()) / (1000 * 60 * 60 * 24);
    if (dateDiff > 180 && data?.re_release_boxoffice?.length <= 1) {
      setDisplayShowTime(false);
      return;
    }

    const pin = normalizeZip(localStorage.getItem('pincode'));
    const getLocation = async () => {
      if (!navigator.geolocation) {
        return fallbackToIP();
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;

            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );

            const data = await res.json();
            const pin = normalizeZip(data?.address?.postcode);
            setUserPincode(pin);
            loadShowTimeZipData(pin, selectedApiDate);
          } catch (err) {
            console.log('err', err);
          }
        }
      );
    };

    const fallbackToIP = async () => {
      try {
        const res = await fetch('/api/location/');
        const contentType = res.headers.get('content-type');
        if (!res.ok || !contentType?.includes('application/json')) {
          setShowtimeError('Could not detect location. Enter a ZIP code above.');
          setShowTimeDataLoaded(true);
          return;
        }
        const data = await res.json();
        const pin = normalizeZip(data?.zipcode);
        if (pin) {
          setUserPincode(pin);
          loadShowTimeZipData(pin, selectedApiDate);
        } else {
          setShowtimeError('Could not detect location. Enter a ZIP code above.');
          setShowTimeDataLoaded(true);
        }
      } catch {
        setShowtimeError('Could not detect location. Enter a ZIP code above.');
        setShowTimeDataLoaded(true);
      }
    };
    if (pin) {
      setUserPincode(pin);
      loadShowTimeZipData(pin, selectedApiDate);
    } else {
      getLocation();
    }
  }, []);
  // When date changes, refresh if we already have a ZIP
  useEffect(() => {
    if (!userPincode) return;
    loadShowTimeZipData(userPincode, selectedApiDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedApiDate]);

  const getTheatreDataByZipCode = (e: React.FormEvent) => {
    e.preventDefault();
    loadShowTimeZipData(userPincode, selectedApiDate);
  };

  const getLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(success, geoError, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
  };

  const success = (pos: GeolocationPosition) => {
    const crd = pos.coords;
    const coordinatesUrl = `https://api.opencagedata.com/geocode/v1/json?q=${crd.latitude}+${crd.longitude}&key=7bcf32f4394e4c56820a138c135722e2`;
    fetch(coordinatesUrl)
      .then((res) => res.json())
      .then((json) => {
        const pin = normalizeZip(json?.results?.[0]?.components?.postcode);
        if (!pin) return;
        setUserPincode(pin);
        loadShowTimeZipData(pin, selectedApiDate);
      })
      .catch(() => {
        setShowtimeError('Failed to detect location');
      });
  };

  const geoError = (err: GeolocationPositionError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPincode(normalizeZip(e.target.value));
  };

  if (!displayShowTime) return null;

  return (
    <section className="theater_timing text-white py-6 md:py-8 lg:py-12 mt-4 md:mt-8 bg-zinc-900" id="theater_timing">
      <div className="container">
        <h2 className="text-white">Current Showtimes</h2>

        <div className="dateselector bg-white rounded-lg px-2 py-2 flex flex-wrap justify-between gap-4">
          <div className="zipfinder relative pl-10 z-[1]">
            <div className="currentlocationinfo">
              <form className="flex items-center w-full border border-gray-900 rounded-full overflow-hidden bg-white relative" onSubmit={getTheatreDataByZipCode}>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  className="locinputbox"
                  placeholder="Enter ZIP Code"
                  value={userPincode}
                  onChange={handleZipChange}
                />
                <button type="submit" className="bg-stone-900 text-white rounded-full p-2 rotate-[85deg]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 flip">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </form>

              <div className="mt-2 w-full">
                <button className="bg-stone-900 text-white rounded-full flex items-center justify-center py-2 px-5 hover:bg-gray-700 w-full gap-1" onClick={getLocation}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  Find My Location
                </button>
              </div>
            </div>

            <div className="zipor absolute top-[14px] left-[10px] z-[-1]">
              <span className="text-black bg-white top-[14px] left-[-6px] absolute">or</span>
              <span className="text-white border border-black rounded-[21px] p-1 h-[55px] block border-r-white">round</span>
            </div>
          </div>

          <div className="dateselector_dates">
            <ul
              className="flex flex-wrap gap-2 list-none items-center ml-0 mb-0 [&>li]:py-1 [&>li]:lg:py-5 [&>li]:px-2 [&>li]:rounded-lg [&>li]:bg-stone-900 [&>li]:text-white [&>li]:cursor-pointer [&>li]:uppercase [&>li]:min-w-12 [&>li]:text-center 
                  [&>li:hover]:bg-orangegold [&>li:hover]:text-black [&>li.active]:bg-orangegold [&>li.active]:text-black
                  [&>li]:w-[64px] [&>li]:sm:w-[90px] [&>li]:lg:h-[90px]"
            >
              {dates.map((d, index) => (
                <li key={index} className={selectedApiDate === d.apiDate ? 'active' : ''} onClick={() => setSelectedApiDate(d.apiDate)}>
                  {d.labelDay} <span className="font-bold capitalize block mt-[-6px] xsm:mt-0 uppercase">{d.labelDate}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {showTimeDataLoaded && userPincode && (showtimeError || theatres.length === 0) && (
          <div className="text-center mt-4 text-gray-200">
            No data available
          </div>
        )}
        {!showTimeDataLoaded && userPincode ? (
          <div className="relative min-h-[100px] mt-6 flex items-center justify-center bg-transparent">
            <div className="w-12 h-12 rounded-full border-2 border-white border-t-transparent animate-spin" aria-hidden />
          </div>
        ) :
          <>
            <ul className="theater_list ml-0 list-none flex flex-wrap gap-2 lg:gap-4 items-center mt-3 md:mt-7">
              {!hasNoData && theatres.slice(0, 6).map((t, idx) => (
                <li
                  key={idx}
                  className={`${t.title === selectedTheatreTitle ? 'bg-orangegold' : 'bg-gray-300'} text-black hover:bg-orangegold cursor-pointer min-w-40 transition-all duration-300 lg:mt-2 lg:text-xl text-lg sm:px-8 px-4 sm:py-1.5 py-0.5 rounded-2xl font-bold capitalize`}
                  onClick={() => setSelectedTheatreTitle(t.title)}
                >
                  {t.title}
                </li>
              ))}
            </ul>

            {activeTheatreData && !hasNoData && (
              <>
                <div className="theateradress flex flex-wrap gap-1 sm:gap-3 mt-4 items-center">
                  <p className="text-orangegold">{activeTheatreData.address}</p>
                  <span className="flex items-center gap-1 border border-white rounded-full px-3 py-0.5 mb-4 sm:inline-flex">
                    <svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 32.9921 4.2461 C 30.0390 1.2930 25.8437 1.3632 22.8905 4.3164 L 4.3046 22.9023 C 1.3515 25.8554 1.2812 30.0508 4.2343 33.0039 L 23.0078 51.7539 C 25.9609 54.7070 30.1327 54.6601 33.1093 51.6836 L 51.6953 33.0976 C 54.6718 30.1211 54.7188 25.9492 51.7654 22.9961 Z M 39.5781 22.0820 C 41.0078 23.2305 41.0078 24.6132 39.5781 25.7617 L 34.0468 30.0742 C 32.8515 30.9883 31.2812 30.3320 31.2812 28.8086 L 31.2812 25.8086 L 24.8593 25.8086 C 22.8437 25.8086 21.8359 26.7695 21.8359 28.9023 L 21.8359 34.7383 C 21.8359 36.0742 21.1562 36.8242 19.9609 36.8476 C 18.7421 36.8711 18.0624 36.0742 18.0624 34.7383 L 18.0624 28.7148 C 18.0624 24.1914 20.2421 22.0352 24.8124 22.0352 L 31.2812 22.0352 L 31.2812 19.0117 C 31.2812 17.4883 32.8515 16.8320 34.0468 17.7695 Z" />
                    </svg>
                    {activeTheatreData.miles_distance} Miles
                  </span>
                </div>

                <div className="theatertimes">
                  <ul
                    className="list-none flex flex-wrap gap-2 items-center ml-0 mb-0
                [&>li]:rounded-full [&>li]:px-4 [&>li]:py-1 [&>li]:border [&>li]:border-gray-300 [&>li]:min-w-[140px] [&>li]:sm:min-w-[160px] [&>li]:text-center
                [&>li]:cursor-pointer [&>li]:relative"
                  >
                    {(activeTheatreData.show_times ?? []).map((time, index) => (
                      <li key={index} className="hover:bg-orangegold hover:text-orangegold group">
                        {time.start_at}
                        {time.booking_link && (
                          <span className="block absolute top-[5px] left-[30%] uppercase font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Link href={time.booking_link} target="_blank" className="text-black hover:text-black">
                              Buy Now
                            </Link>
                          </span>
                        )}
                      </li>
                    ))}

                    {(activeTheatreData.show_times ?? []).length === 0 && (
                      <li className="bg-gray-300 text-black hover:bg-orangegold hover:text-orangegold group">No showtimes available on {selectedLabelDate}</li>
                    )}
                  </ul>
                </div>
              </>
            )}
          </>}

      </div>
    </section>
  );
};

export default TheatreTiming;

