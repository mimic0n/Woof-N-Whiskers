import { useI18n } from '../../i18n';
import { Button, Icon } from '../../components/site/UI';
import SearchBox from '../../components/site/SearchBox';
import Meta from '../../components/site/Meta';
export default function NotFound(){const {l,t}=useI18n();return <div className="container section narrow empty"><Meta title={['Không tìm thấy trang','Page not found']}/><Icon width="64" height="64"/><p className="reference">404</p><h1>{l('Có vẻ bé đã đi lạc một chút.','Looks like we took a little detour.')}</h1><p>{l('Trang bạn tìm không tồn tại. Tìm sản phẩm, dịch vụ hoặc quay về trang chủ nhé.','This page does not exist. Search products and services, or head home.')}</p><SearchBox/><Button to="/">{t('home')}</Button></div>;}
