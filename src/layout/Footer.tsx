const App: React.FC = () => {
  const classHeadingFooter = "font-medium text-[rgb(56,_56,_61)] mb-[12px] text-base";
  return (
    <section className="grid grid-cols-5 py-4 px-20 gap-4">
      <div className="text-[rgb(128,_128,_137)] text-xs">
        <h4 className={classHeadingFooter}>
          Hỗ trợ khách hàng
        </h4>
        <div className="flex flex-col gap-2">
          <p>
            Hotline:{" "}
            <a className="text-[rgb(56,_56,_61)] font-medium">1900-6035</a>
            <span className="block">(1000 đ/phút, 8-21h kể cả T7, CN)</span>
          </p>
          <a href="#!">Các câu hỏi thường gặp</a>
          <a href="#!">Gửi yêu cầu hỗ trợ</a>
          <a href="#!">Hướng dẫn đặt hàng</a>
          <a href="#!">Phương thức vận chuyển</a>
          <a href="#!">Chính sách kiểm hàng</a>
          <a href="#!">Chính sách đổi trả</a>
          <a href="#!">Hướng dẫn trả góp</a>
          <a href="#!">Chính sách hàng nhập khẩu</a>
          <a href="#!">Hỗ trợ khách hàng: hotro@tiki.vn</a>
          <a href="#!">Báo lỗi bảo mật: security@tiki.vn</a>
        </div>
      </div>
      <div>
        <h4 className={classHeadingFooter}>Về Tiki</h4>
        <div className="text-[rgb(128,_128,_137)] text-xs flex flex-col gap-2">
          <a href="#!">Giới thiệu Tiki</a>
          <a href="#!">Tiki Blog</a>
          <a href="#!">Tuyển dụng</a>
          <a href="#!">Chính sách bảo mật thanh toán</a>
          <a href="#!">Chính sách bảo mật thông tin cá nhân</a>
          <a href="#!">Chính sách giải quyết khiếu nại</a>
          <a href="#!">Điều khoản sử dụng</a>
          <a href="#!">Giới thiệu Tiki Xu</a>
          <a href="#!">Tiếp thị liên kết cùng Tiki</a>
          <a href="#!">Bán hàng doanh nghiệp</a>
          <a href="#!">Điều kiện vận chuyển</a>
        </div>
      </div>
      <div>
        <h4 className={classHeadingFooter}>Hợp tác và liên kết</h4>
        <div className="text-[rgb(128,_128,_137)] text-xs flex flex-col gap-2 mb-6">
          <a href="#!">Quy chế hoạt động Sàn GDTMDT</a>
          <a href="#!">Bán hàng cùng Tiki</a>
        </div>
        <h4 className={classHeadingFooter}>Chứng nhận bởi</h4>
        <div className="flex space-x-4">
          <a href="#!">
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
              alt=""
              className="w-[32px] h-[32px]"
            />
          </a>
          <a href="#!">
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
              alt=""
              className="w-[32px] h-[32px]"
            />
          </a>
          <a href="#!">
            <img
              src="https://images.dmca.com/Badges/dmca_protected_sml_120y.png?ID=388d758c-6722-4245-a2b0-1d2415e70127"
              alt=""
              className="w-[32px] h-[32px]"
            />
          </a>
        </div>
      </div>
      <div>
        <h4 className={classHeadingFooter}>Phương thức thanh toán</h4>
        <div className="grid grid-cols-5 mb-6">
          {Array(10)
            .fill(
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGW9gK8FErKAB-SahelM87SM5OZqD-2HeLDQ&s"
            )
            .map((src, index) => (
              <span key={index}>
                <img src={src} alt="" />
              </span>
            ))}
        </div>
        <h4 className={classHeadingFooter}>Dịch vụ giao hàng</h4>
        <a href="#!">
          <img
            src="https://salt.tikicdn.com/ts/upload/74/56/ab/e71563afb23e3f34a148fe1b7d3413c5.png"
            alt=""
            className="w-1/2 ml-[-8px] mt-[-8px]"
          />
        </a>
      </div>
      <div>
        <h4 className={classHeadingFooter}>Kết nối với chúng tôi</h4>
        <div className="flex mb-6 gap-2">
          <a href="#!">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/900px-2023_Facebook_icon.svg.png"
              alt=""
              className="w-[32px] h-[32px]"
            />
          </a>
          <a href="#!">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/900px-2023_Facebook_icon.svg.png"
              alt=""
              className="w-[32px] h-[32px]"
            />
          </a>
          <a href="#!">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/900px-2023_Facebook_icon.svg.png"
              alt=""
              className="w-[32px] h-[32px]"
            />
          </a>
        </div>
        <h4 className={classHeadingFooter}>Tải ứng dụng trên điện thoại</h4>
        <div className="flex gap-2">
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
            alt=""
            className="w-[80px] h-[80px]"
          />
          <div className="flex flex-col gap-2">
            <a href="#!">
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                alt=""
                className="h-[36px]"
              />
            </a>
            <a href="#!">
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                alt=""
                className="h-[36px]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default App;
