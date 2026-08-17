export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
export const PASSWORD_ERROR_MESSAGE =
    "Mật khẩu yêu cầu : \n *Có từ 8 ký tự trở lên \n *Bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt (@$!%*?&).";


export const COMPANY_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+\.(nhanvien|truongphong|quantrivien)\.2026@bigtech\.com$/;
export const EMAIL_ERROR_MESSAGE = "Email không phù hợp";