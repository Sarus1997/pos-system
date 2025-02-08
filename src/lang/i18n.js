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

    //* ProfilePage
    title_profile: "User information",
    title_subtitle: "Manage your personal information",
    photo_profile: "Select a picture",
    profile_section_title: "Account information",
    profile_username: "Username",
    ple_name: "Please enter your name",
    profile_password: "Password",
    pls_password: "Enter your password",
    profile_email: "Email",
    personal_section_title: "Personal information",
    profile_personal_name: "Name",
    profile_personal_lastname: "Lastname",
    profile_personal_birthday: "Birthday",
    profile_personal_tel: "Tel",
    profile_personal_address: "Address",
    ple_address: "Please enter your address",
    work_section_title: "Work information",
    profile_work_position: "Position",
    profile_work_position_current: "Position",
    profile_role: "Role",
    profile_selected_role: "Selected Role",
    profile_role_admin: "Admin",
    profile_role_manager: "Manager",
    profile_role_user: "User",
    profile_personal_bio: "About You",
    ple_bio: "Tell me a little bit about yourself...",
    profile_personal_edit: "Edit information",
    profile_personal_save: "Save information",
    profile_personal_cancel: "Cancel",
    profile_logout: "Logout",
    profile_non_save: "Unable to save information",
    profile_error: "Error connecting to server",

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

    //* ProfilePage
    title_profile: "ข้อมูลส่วนตัว",
    title_subtitle: "จัดการข้อมูลส่วนตัวของคุณ",
    photo_profile: "เลือกรูปภาพ",
    profile_section_title: "ข้อมูลบัญชี",
    profile_username: "ชื่อผู้ใช้งาน",
    ple_name: "กรุณาใส่ชื่อของคุณ",
    profile_password: "รหัสผ่าน",
    pls_password: "กรุณาใส่รหัสผ่าน",
    profile_email: "อีเมล์",
    personal_section_title: "ข้อมูลส่วนตัว",
    profile_personal_name: "ชื่อ",
    profile_personal_lastname: "นามสกุล",
    profile_personal_birthday: "วันเกิด",
    profile_personal_tel: "เบอร์โทรศัพท์",
    profile_personal_address: "ที่อยู่",
    work_section_title: "ข้อมูลที่ทำงาน",
    profile_work_position: "ตำแหน่ง",
    profile_work_position_current: "ตำแหน่งปัจจุบัน",
    ple_address: "กรอกที่อยู่ของคุณ",
    profile_role: "สิทธิ์",
    profile_selected_role: "สิทธิ์ที่เลือก",
    profile_role_admin: "แอดมิน",
    profile_role_manager: "ผู้จัดการ",
    profile_role_user: "ผู้ใช้ทั่วไป",
    profile_personal_bio: "เกี่ยวกับคุณ",
    ple_bio: "เล่าเกี่ยวกับตัวคุณสักหน่อย...",
    profile_personal_edit: "แก้ไขข้อมูล",
    profile_personal_save: "บันทึกข้อมูล",
    profile_personal_cancel: "ยกเลิก",
    profile_logout: "ออกจากระบบ",
    profile_non_save: "ไม่สามารถบันทึกข้อมูลได้",
    profile_error: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",

  }
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
