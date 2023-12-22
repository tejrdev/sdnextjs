//for state management
import { Providers } from '../../redux/provider';

export default function WithReduxLayout({ children }) {
  return <Providers>{children}</Providers>;
}
