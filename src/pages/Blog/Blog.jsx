import { useParams } from 'react-router-dom';
import { posts } from '../../data/data';
import { useI18n } from '../../i18n';
import { BlogCards } from '../../components/site/Cards';
import { Button, ImageLabel } from '../../components/site/UI';
import Meta from '../../components/site/Meta';
export default function Blog(){const {id}=useParams();const {t,l}=useI18n();const post=posts.find(p=>p.id===id);return <div className="container section"><Meta title={post?post.title:['Góc chăm sóc thú cưng','Pet care tips']}/>{id&&!post?<><h1>{l('Không tìm thấy bài viết','Article not found')}</h1><Button to="/blog/">{t('blog')}</Button></>:post?<article className="narrow"><span className="tag">{post.tag}</span><h1>{l(post.title)}</h1><p className="subtle">{post.minutes} {l('phút đọc · Bài mẫu','min read · Sample article')}</p><ImageLabel src={post.image} alt={l(post.title)}/><p className="article-body">{l(post.body)}</p><p className="alert">{l('Bài viết minh họa, nội dung cần shop biên tập và xác nhận trước khi công bố thực tế.','Sample article, requiring editorial review and shop confirmation before live publication.')}</p><Button secondary to="/blog/">{t('back')}</Button></article>:<><div className="page-heading"><h1>{t('blog')}</h1><p>{l('Những điều nhỏ để hiểu bé hơn, thương bé đúng cách.','Little things to understand your pet and care thoughtfully.')}</p></div><BlogCards/></>}</div>;}
