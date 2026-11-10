import { websiteImages } from './website-images';
import { productImages } from './product-images';
import productDetails from './product-details.json';
export const SHOW_DEMO_REVIEWS = false;
export const ALLOW_MULTI_PET = false;
export const FEATURE_ACTIVITY_LOG = false;
export const business = { name:"Woof N' Whiskers", address:'49 Phạm Kiệt, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng', phone:'093 560 5311', email:'phungntldn@gmail.com' };
export const services = [
 {id:'daycare',slug:'cham-soc-ban-ngay',name:['Chăm sóc ban ngày','Daycare'],title:['Chăm sóc ban ngày – Để bé vui chơi, bạn an tâm làm việc','Daycare – A happy day for your pet while you work'],price:150000,unit:'day',image:websiteImages.serviceBanners.daycare,description:['Dành cho thú cưng cần không gian chăm sóc trong ngày.','For pets who need care during the day.'],steps:[['Tiếp nhận','Check-in'],['Bắt đầu chăm sóc','Start of care'],['Chăm sóc trong ngày','Daytime care'],['Bàn giao','Collection']],includes:[['Sinh hoạt và nghỉ ngơi','Daily routine and rest'],['Ăn uống theo thông tin chủ nuôi cung cấp','Feeding based on owner information'],['Vui chơi theo khả năng tiếp nhận thực tế','Play, subject to actual availability']],notes:[['Thông tin sức khỏe & tiêm phòng','Health and vaccination information'],['Dị ứng, chế độ ăn, thuốc và hành vi cần lưu ý','Allergies, diet, medication and behaviour'],['Thức ăn, vật dụng cá nhân; tuân thủ giờ nhận/bàn giao','Food, personal belongings and collection hours']],cta:['Một ngày bận rộn của bạn, vẫn có thể là một ngày vui của bé!','Your busy day can still be a happy day for your pet!']},
 {id:'boarding',slug:'luu-tru-ban-dem',name:['Lưu trú ban đêm','Overnight boarding'],title:['Lưu trú ban đêm – Người bạn nhỏ có nơi nghỉ ngơi khi bạn vắng nhà','Overnight boarding – A place to rest while you are away'],price:300000,unit:'night',image:websiteImages.serviceBanners.boarding,description:['Khi bạn đi công tác, du lịch hoặc vắng nhà trong vài ngày, tìm hiểu nơi nghỉ ngơi và nhu cầu chăm sóc của bé.','Explore care and overnight stays when travelling or away from home.'],steps:[['Đăng ký lưu trú','Request a stay'],['Tiếp nhận & kiểm tra thông tin','Check-in and review'],['Lưu trú','Overnight stay'],['Bàn giao','Collection']],includes:[['Khu nghỉ ngơi: cần shop xác nhận','Resting space: to be confirmed'],['Chế độ ăn theo thông tin đã trao đổi','Diet as discussed with the owner'],['Sinh hoạt, vận động & hỗ trợ chăm sóc: cần xác nhận','Routine, exercise and care support: to be confirmed']],notes:[['Thông tin sức khỏe & tiêm phòng','Health and vaccination information'],['Bệnh lý, dị ứng, thuốc, chế độ ăn, hành vi/lo âu','Conditions, allergies, medication, diet, behaviour/anxiety'],['Cung cấp số điện thoại khẩn cấp','Provide an emergency phone number']],cta:['Bạn sắp có một chuyến đi? Hãy chuẩn bị nơi nghỉ ngơi cho bé trước nhé!','Planning a trip? Arrange a place for your pet to stay.']},
 {id:'grooming',slug:'cham-soc-long',name:['Chăm sóc lông','Grooming'],title:['Chăm sóc lông – Sạch sẽ, gọn gàng và đáng yêu hơn mỗi ngày','Grooming – Clean, tidy and lovely every day'],price:200000,unit:'visit',image:websiteImages.serviceBanners.grooming,description:['Vệ sinh và chăm sóc bộ lông qua các bước tắm, sấy, chải lông và tạo kiểu tùy theo gói được lựa chọn.','Bathing, drying, brushing and styling according to the selected package.'],steps:[['Tiếp nhận & tư vấn','Check-in and consultation'],['Vệ sinh & làm sạch','Bathing and cleaning'],['Sấy & chăm sóc lông','Drying and coat care'],['Kiểm tra & bàn giao','Review and collection']],includes:[['Tắm và vệ sinh','Bathing and cleaning'],['Sấy khô, chải và gỡ rối lông','Drying, brushing and detangling'],['Cắt tỉa, tạo kiểu và chăm sóc bổ sung nếu được cung cấp','Trimming, styling and additional care if offered']],notes:[['Tình trạng da, lông, sức khỏe và dị ứng','Skin, coat, health and allergies'],['Sợ nước/máy sấy, kiểu cắt mong muốn, lông rối nhiều','Fear of water/dryers, preferred styling and matting'],['Vết thương/bệnh da liễu cần cơ sở đánh giá trước','Wounds or skin conditions require assessment before care']],cta:['Đã đến lúc chăm chút cho diện mạo của bé!','Time for a little coat care!']}
];
export const trust = [['Thông tin dịch vụ minh bạch','Clear service information'],['Quan tâm đến từng thú cưng','Care for every pet'],['Quy trình rõ ràng','A clear process'],['Dễ dàng đặt lịch','Easy booking']];
const seeds = [
 ['hamster-gerbil-mix','Hamster & Gerbil Mix','small',25000,899000],
 ['guinea-pig-pellets','Guinea Pig Pellets','small',28000,399000],
 ['rabbit-pellet-food','Rabbit Pellet Food','small',30000,null],
 ['salmon-skin-care-cat-food','Salmon Skin Care Cat Food','cat',42000,1199000],
 ['tuna-feast-cat-food','Tuna Feast Cat Food','cat',40000,1990000],
 ['indoor-cat-nutrition','Indoor Cat Nutrition','cat',38000,999000],
 ['active-dog-formula','Active Dog Formula','dog',45000,849000],
 ['protein-power-dog-food','Protein Power Dog Food','dog',55000,519000],
 ['chicken-delight-dog-food','Chicken Delight Dog Food','dog',55000,1790000]
];
export const categories = [['food-dog',['Thức ăn cho chó','Dog food']],['food-cat',['Thức ăn cho mèo','Cat food']],['food-small',['Thức ăn cho thú cưng nhỏ','Small pet food']]];
export const products = seeds.map(([id,name,species,priceMin,priceMax]) => {
 const details = productDetails[id];
 const prices = details.variants.map(v => v.price).filter(Number.isFinite);
 return {id,slug:id,name:[name,name],category:`food-${species}`,species,
  priceMin:prices.length ? Math.min(...prices) : priceMin,
  priceMax:prices.length ? Math.max(...prices) : priceMax,
  price:prices.length ? Math.min(...prices) : priceMin,
  image:productImages[id][0],images:productImages[id],stock:Infinity,
  ...details,related:seeds.filter(row=>row[2]===species&&row[0]!==id).map(row=>row[0])};
});
export const stitchProducts = products;
export const faqs = [
 {group:'booking',q:['Tôi đặt lịch như thế nào?','How do I request a booking?'],a:['Chọn dịch vụ và thời gian, thông tin thú cưng, thông tin khách hàng, sau đó kiểm tra và gửi yêu cầu. Shop sẽ xác nhận sau khi tiếp nhận.','Choose a service and time, add pet and customer details, then review and submit. The shop confirms after reviewing your request.']},
 {group:'services',service:'daycare',q:['Thú cưng có thể sử dụng dịch vụ trong bao lâu?','How long can my pet use daycare?'],a:['Thời gian chăm sóc phụ thuộc vào khung giờ hoạt động và gói dịch vụ của cơ sở. Vui lòng kiểm tra khung giờ khi đặt lịch.','Care duration depends on operating hours and the selected package. Please check the available times when booking.']},
 {group:'services',service:'daycare',q:['Có thể gửi cả chó và mèo không?','Can both dogs and cats stay?'],a:['Điều này phụ thuộc vào khả năng tiếp nhận và điều kiện chăm sóc thực tế của cơ sở.','This depends on the facility’s actual capacity and care conditions.']},
 {group:'services',service:'daycare',q:['Tôi cần chuẩn bị gì?','What should I prepare?'],a:['Bạn nên chuẩn bị thông tin sức khỏe, chế độ ăn và các lưu ý đặc biệt của thú cưng.','Prepare your pet’s health information, diet and special care notes.']},
 {group:'services',service:'boarding',q:['Giá lưu trú được tính như thế nào?','How is boarding priced?'],a:['Giá được tính theo đêm và có thể thay đổi theo cân nặng/kích thước, số đêm, loại phòng/gói và thời gian nhận/trả.','Prices are per night and may vary by weight/size, number of nights, room/package and collection times.']},
 {group:'services',service:'boarding',q:['Tôi có thể mang thức ăn riêng không?','Can I bring my pet’s own food?'],a:['Bạn nên trao đổi trước với cơ sở về chế độ ăn và các vật dụng cần mang theo.','Discuss your pet’s diet and belongings with the facility in advance.']},
 {group:'services',service:'boarding',q:['Tôi có thể kéo dài thời gian lưu trú không?','Can I extend the stay?'],a:['Bạn cần liên hệ cơ sở để kiểm tra khả năng tiếp nhận và xác nhận chi phí phát sinh.','Contact the facility to check availability and confirm additional charges.']},
 {group:'services',service:'grooming',q:['Giá grooming có giống nhau cho mọi thú cưng không?','Is grooming the same price for every pet?'],a:['Giá thay đổi theo loài, kích thước, cân nặng, độ dài và tình trạng lông, hạng mục thực hiện.','Prices vary by species, size, weight, coat length and condition, and the selected treatments.']},
 {group:'services',service:'grooming',q:['Tôi có thể yêu cầu kiểu cắt tỉa cụ thể không?','Can I request a particular trim?'],a:['Chủ nuôi có thể trao đổi kiểu mong muốn khi tiếp nhận. Khả năng thực hiện cần được xác nhận theo tình trạng lông và dịch vụ của cơ sở.','Discuss the desired style at check-in. Feasibility depends on coat condition and the services offered.']},
 {group:'services',service:'grooming',q:['Thời gian grooming mất bao lâu?','How long does grooming take?'],a:['Thời lượng tùy thuộc vào gói dịch vụ, kích thước và tình trạng lông của thú cưng.','Duration depends on the package, size and coat condition.']},
 {group:'booking',q:['Giờ hoạt động của shop?','What are the opening hours?'],a:['Thứ 2 – Chủ nhật, 08:00 – 20:00.','Monday – Sunday, 08:00 – 20:00.']},
 {group:'payment',q:['Tôi có thể thanh toán bằng cách nào?','How can I pay?'],a:['Vui lòng liên hệ shop để được hướng dẫn về phương thức thanh toán.','Please contact the shop for available payment methods.'],needsOwnerConfirm:true},
 {group:'cancel',q:['Tôi có thể thay đổi hoặc hủy lịch không?','Can I change or cancel a booking?'],a:['Vui lòng liên hệ shop để được hướng dẫn về thời hạn báo trước và phí áp dụng.','Please contact the shop for notice periods and applicable fees.'],needsOwnerConfirm:true}
];
export const posts = [
 {id:'dinh-duong',tag:'Nutrition',title:['Những lưu ý khi thay đổi thức ăn cho chó, mèo','Things to consider when changing your pet’s food'],minutes:5,image:'/assets/products/orijen-tundra.webp',body:['Trước khi thay đổi thức ăn, hãy ghi lại khẩu phần hiện tại và những lưu ý của bé để trao đổi với người có chuyên môn. Bài viết minh họa; nội dung hướng dẫn chi tiết cần được shop biên tập và xác nhận.','Before changing food, record your pet’s current diet and relevant notes to discuss with a qualified professional. Sample article; detailed guidance requires editorial review and shop confirmation.']},
 {id:'cham-soc-long',tag:'Grooming',title:['Bao lâu nên tắm cho thú cưng một lần?','How often should you bathe your pet?'],minutes:4,image:'/assets/hero-2.webp',body:['Nhu cầu chăm sóc phụ thuộc vào đặc điểm và tình trạng của từng bé. Khi đặt lịch, hãy chia sẻ tình trạng da, lông, dị ứng và các sản phẩm không phù hợp. Shop sẽ trao đổi về dịch vụ trước khi tiếp nhận.','Care needs vary between pets. Share skin and coat information, allergies and unsuitable products when booking. The shop will discuss the service before check-in.']},
 {id:'luu-tru',tag:'Boarding',title:['Cần chuẩn bị gì trước khi gửi thú cưng qua đêm?','What to prepare for an overnight stay'],minutes:6,image:'/assets/hero-3.webp',body:['Chuẩn bị thông tin sức khỏe, tiêm phòng, chế độ ăn, thuốc đang dùng, lưu ý hành vi và số điện thoại khẩn cấp. Trao đổi trước với shop về vật dụng cá nhân và giờ nhận/trả.','Prepare health and vaccination details, diet, medication, behaviour notes and an emergency phone number. Discuss belongings and collection times with the shop beforehand.']}
];
export const policyNames = {'huy-lich':'cancellation','tiem-phong':'vaccination','bao-mat':'privacy','doi-tra':'returns','dieu-khoan':'terms'};
export const policySections = {
 'huy-lich': [['Thời gian nhận/trả','Check-in and collection'],['Phí trả trễ','Late collection fees'],['Gia hạn lưu trú','Extending a stay'],['Hủy/đổi lịch','Cancellation and rescheduling'],['Xử lý vấn đề sức khỏe','Health incidents']],
 'tiem-phong': [['Thông tin sức khỏe','Health details'],['Tình trạng tiêm phòng','Vaccination status'],['Điều kiện tiếp nhận','Admission conditions']],
 'bao-mat': [['Dữ liệu lưu trên trình duyệt','Browser storage'],['Quyền quản lý dữ liệu','Managing your data'],['Liên hệ về dữ liệu','Data enquiries']],
 'doi-tra': [['Điều kiện đổi trả','Return conditions'],['Thời hạn và chi phí','Time limits and charges'],['Quy trình liên hệ','How to contact us']],
 'dieu-khoan': [['Phạm vi dịch vụ','Service scope'],['Yêu cầu đặt lịch','Booking requests'],['Thanh toán mô phỏng','Simulated payments']]
};
export const policySummary = ['Vui lòng liên hệ shop để được hướng dẫn chi tiết về giờ nhận/trả, thời hạn báo trước và phí phát sinh.','Please contact the shop for guidance on check-in, collection, notice periods and additional fees.'];

export const policyConfirmation = { cancellation:{needsOwnerConfirm:true}, vaccination:{needsOwnerConfirm:true}, returns:{needsOwnerConfirm:true}, payment:{needsOwnerConfirm:true} };
