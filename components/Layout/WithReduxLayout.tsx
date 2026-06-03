// //for state management
// import { Providers } from '../../redux/provider';

// export default function WithReduxLayout({ children }) {
//   return <Providers>{children}</Providers>;
// }

// components/layouts/WithReduxLayout.tsx
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // adjust path as needed

interface WithReduxLayoutProps {
  children: React.ReactNode;
  layout?: string;
}

const WithReduxLayout: React.FC<WithReduxLayoutProps> = ({ children, layout }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default WithReduxLayout;
