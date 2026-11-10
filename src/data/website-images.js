// Owner-supplied images, grouped by their intended page and section.
const root = '/assets/images/Website';
export const websiteImages = {
 homeIntro: `${root}/Trang chủ/Một nơi yêu thương dành cho những người bạn bốn chân.png`,
 servicesBanner: `${root}/Trang dịch vụ/Banner.png`,
 familyCare: `${root}/Trang dịch vụ/Không nhốt chuồng, chăm như người nhà.png`,
 daycarePlay: `${root}/Trang dịch vụ/Sân chơi daycare.png`,
 serviceBanners: {
  daycare: `${root}/Trang dịch vụ/1 Chăm sóc ban ngày/Banner.png`,
  boarding: `${root}/Trang dịch vụ/2 Lưu trú ban đêm/Banner.png`,
  grooming: `${root}/Trang dịch vụ/3 Chăm sóc lông/Banner.png`,
 },
 boardingSupport: `${root}/Trang dịch vụ/2 Lưu trú ban đêm/Hỗ trợ chăm sóc.png`,
 boardingProcess: [1, 2, 3].map(step => `${root}/Trang dịch vụ/2 Lưu trú ban đêm/quy trình cham soc/${step}.png`),
};
