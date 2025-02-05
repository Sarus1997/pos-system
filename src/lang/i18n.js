import { createI18n } from 'vue-i18n';

const messages = {
  // TODO:  ภาษาอังกฤษ
  en: {
    //*  SidebarPage
    report: "Report",
    menu_pos: "Product List",
    receipt: "Eceipt",
    profile: "Profile",

    //*  SidebarPage Footer
    footer_company: "White Cat Intertech Public Company Limited",

    //*  SettingsPage
    settings: "Settings",
    theme: "Theme",
    theme_light: "Light",
    theme_dark: "Dark",
    language: "Language",

    //* LoginPage
    login_title: "Login",
    login_subtitle: "Please login to continue",
    login_username: "Username",
    login_password: "Password",
    login_logging_in: "Logging in...",
    login_btn: "Login",


    //* ReceiptPage
    receipt_title: "Enter order number",
    receipt_get_btn: "Select Data",
    receipt_print_btn: "Print",
    receipt_title_header: "Receipt",
    receipt_number_order: "Receipt number",
    receipt_date_order: "Date",
    receipt_payment_number: "Payment number",
    receipt_payment_by: "Payment by",
    receipt_item: "Item",
    receipt_bath: "Bath",
    receipt_product_item: "Product List",
    receipt_quantity: "Quantity",
    receipt_price_item: "Price",
    receipt_price_discount: "Discount",
    receipt_price_total: "Total",
    receipt_total_all: "Total All",
    receipt_no_product: "No product information",
    receipt_order_number: "Please enter the order number",
    receipt_not_found: "Receipt information not found",
  },

  // TODO:  ภาษาไทย
  th: {
    //*  SettingsPage
    settings: "การตั้งค่า",
    theme: "ธีม",
    theme_light: "สว่าง",
    theme_dark: "มืด",
    language: "ภาษา",

    //*  SidebarPage Footer
    footer_company: "บริษัท แมวขาว อินเตอร์เทค จำกัด (มหาชน)",

    //*  SidebarPage
    report: "รายงาน",
    menu_pos: "รายการสินค้า",
    receipt: "ใบเสร็จ",
    profile: "ข้อมูลส่วนตัว",

    //* LoginPage
    login_title: "เข้าสู่ระบบ",
    login_subtitle: "กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ",
    login_username: "ชื่อผู้ใช้งาน",
    login_password: "รหัสผ่าน",
    login_logging_in: "กําลังเข้าสู่ระบบ...",
    login_btn: "เข้าสู่ระบบ",

    //* ReceiptPage
    receipt_title: "ใส่หมายเลขการสั่งซื้อ",
    receipt_get_btn: "เลือกข้อมูล",
    receipt_print_btn: "พิมพ์",
    receipt_title_header: "ใบเสร็จ",
    receipt_number_order: "เลขที่ใบสั่งซื้อ",
    receipt_date_order: "วันที่",
    receipt_payment_number: "เลขที่ชำระเงิน",
    receipt_payment_by: "การชําระเงินด้วย",
    receipt_item: "ชิ้น",
    receipt_bath: "บาท",
    receipt_product_item: "รายการสินค้า",
    receipt_quantity: "จำนวน",
    receipt_price_item: "ราคาต่อชิ้น",
    receipt_price_discount: "ส่วนลด",
    receipt_price_total: "รวม",
    receipt_total_all: "ยอดรวมทั้งสิ้น",
    receipt_no_product: "ไม่พบข้อมูลสินค้า",
    receipt_order_number: "กรุณาใส่เลขที่ใบสั่งซื้อ",
    receipt_not_found: "ไม่พบข้อมูลใบเสร็จ",

  }
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
