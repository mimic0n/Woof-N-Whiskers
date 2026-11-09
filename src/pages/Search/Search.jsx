import { useSearchParams, Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { services, products } from '../../data/data';
import { normalize } from '../../utils/store';
import SearchBox from '../../components/site/SearchBox';
import { ProductCard } from '../../components/site/Cards';
import { Empty } from '../../components/site/UI';
import Meta from '../../components/site/Meta';
export default function Search(){const [params]=useSearchParams();const q=params.get('q')||'';const {t,l}=useI18n();const matches=p=>q.trim()&&normalize(l(p.name)).includes(normalize(q));const productResults=products.filter(matches),serviceResults=services.filter(matches);return <div className="container section"><Meta title={['Tìm kiếm','Search']}/><div className="page-heading"><h1>{t('search')}</h1><SearchBox key={q} initial={q}/><p role="status">{productResults.length+serviceResults.length} {l('kết quả cho','results for')} “{q}”</p></div>{productResults.length+serviceResults.length?<><section><h2>{t('services')}</h2>{serviceResults.length?<ul className="search-services">{serviceResults.map(s=><li key={s.id}><Link to={`/dich-vu/${s.slug}/`}><strong>{l(s.name)}</strong><span>{l(s.description)} →</span></Link></li>)}</ul>:<p>{l('Không có dịch vụ phù hợp.','No matching services.')}</p>}</section><section className="section"><h2>{t('shop')}</h2><div className="product-grid">{productResults.map(p=><ProductCard key={p.id} product={p}/>)}</div></section></>:<Empty title={l('Chưa tìm thấy kết quả','No results yet')}>{l('Thử từ khóa ngắn hơn, ví dụ “lông”, “nệm” hoặc “bóng”. Tìm kiếm hỗ trợ tiếng Việt không dấu.','Try shorter keywords such as “grooming”, “bed” or “ball”. Vietnamese search works without accents.')}</Empty>}</div>;}
