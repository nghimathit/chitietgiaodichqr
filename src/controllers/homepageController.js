import moment from "moment";
import axios from "axios";
const { GoogleSpreadsheet } = require('google-spreadsheet');
const today = new Date();

const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCI128qq1W7LdL1\n0hAg3/Xv6Xd1iE8lak1r2Wp5tsrFGD1xifyZ6dMop8N2xTowYnGMTeDOqQll876k\nASvWZQki8BxAbYNmrXYKweeuob9MGxwjyzWpY3LOLi2Lsk6FWLYmHXCtthT0zrMC\nJxQyw8BvhTh8Um9XWT5qoazLNWxtIucX5VmzhLJ+fby/3eLPytHQH/x65MwPl+Tt\n2grtVxB+nyFvz+NOhutuVo4+8XC2TY+sxGyljBhX+z0T/0WOW6A3egECM45XHrh0\nsbIyHEyeD/hz50HXEnNfMgRWjZCcvNT5U0qvEwmWVZwbzk1828eqde+RVExcll/P\nd0vqUbQNAgMBAAECggEAAL5K2Ex99rpU/wjZFZSh3V/DSlwnMejV6tQPhAG+MDvl\neYxqVtuyTfI7WZXQrxqZy01Q/05jwq4ERxfKiSubVRlAzgjKQfCHR5+uBoDSbTNo\nf7lG3Viw8vXFQZECZC8LLkHSrt7iVkIZLtXPgkcV8IUkvWglOrA9ao7eRWxQ3nbk\nCeIaC5EFMVSQ/Njr4ESmcELnEUwIoM9CmfSPrJhOZp12BIkuU8QIB/6mg4bOE1Oj\n9Q1JWz8HDQafeK3HWbJU/eAZDQt0V/ZhdOor5AqC1syKL7BCGlDtw8xwyp5yz8d/\nf72bzGPO7pkFOCAZe6LioH+kxkts7nrHWCO6afvK8QKBgQC9Q/apXfi4Una48W/U\nRD3Y+mCYVbIuqIHGZSU1wVD259yKxSsOJgkExEurcvm8V/Hyyi8upYnLtvp/QRFF\nJEPYG4I+ejXdQXjBT2J+NLhAICDveipbYfdfq0ALKnmxhYQWBYoxeLON7uzsUEtk\nlkyo8AJFv+mgcECSBC9f50VMvwKBgQC5F21NVjgD/L1wF9f2rbBrPFVyYj+cy9dD\nDZ+GrXng1iPuZi+3tp2v/mgA3ydzjgXV6lFaYYfWqG2v8avSxO2UL1GzU9otMHQL\nyYgm5KcC668LsBHne44TLgtvx/Mzx+XZYys6SsplyfXDGxoz4Iqdu7IHWHa7z8eM\naiZx+NUWMwKBgH4F4RpJXjGthywCZ4oZnmz52pPUi/6RaUgnVS2D+VtObAVi4BZd\nsSehZRlWR3/nt00I333Z7/Tbc9SECPHXAe3F82WSjocy7ysYpuaOSBk6y3NqDwYm\nJ0dmihBlSf6wfpEDQ09JpZVegBeiJ3FkusrKdVjoPrH7zKLtcnYTUouVAoGBAIY1\nz4LRbuKtRCvgji+HeDH52LeNODUYtakgWrlMVuDKRdma7STYXPT9kyp2pWOr6t1W\n/9B6ggYLsSVwJrg5JVBbE3Hl7oDv7mWRp5EUIWoDvbTK4eCo/bc4nwBZyyaT3z3H\nI9Qr4SD31aW4pEJTog+Hxyp+YfIDUt2lJuVjmhdzAoGAAKVQcQjpP+Jq8jeWv8Vy\nDi6XRAaQwdAPOBjCI6P2qHE0SYhLGMn8urYoEqQbwu5f+uvkQvvXbevp2xBsmI4F\ncnZ+Bzsav8+1JO+9BmO5+5DmvSLPvzB7F6CVvvZh/OY8ToZGndScgH3tE34qi9MG\nmD+FpRQo0r5lLCiy5gtQSCs=\n-----END PRIVATE KEY-----\n';
const CLIENT_EMAIL ='momo-test@momo-test-440310.iam.gserviceaccount.com';
const SHEET_ID = '1yJNX84hbwLgHc3q0XDeU2_OmZ7ljUKZsxy26GleqVrM';

// Biến toàn cục để lưu thông tin đăng nhập
let currentUsername = '';
let currentPassword = '';
let intervalId;

const getHomepage = async (req, res) => {
    return res.render("homepage.ejs");
};

// Định dạng ngày
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getFirstAndLastDayOfMonth(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = today
    return { fromDate: formatDate(firstDay), toDate: formatDate(lastDay) };
}

const { fromDate, toDate } = getFirstAndLastDayOfMonth(today.getFullYear(), today.getMonth());
console.log(fromDate);
console.log(toDate);
//   const getmerchant ="https://proxymomo.onrender.com/api/profile/v2/merchants?language=vi";
//   const data = {
//     username,
//     password
//   };

//   try {
//     const response = await axios.post(
//       "https://proxymomo.onrender.com/api/authentication/login?language=vi",data
//     );
//     const token = response.data.data.token;
//     console.log("tokken",token);
//     const merchantResponse = await axios.get(getmerchant, {
//       headers: {Authorization:"Bearer " + token},
//       timeout: 10000
//     });
//     const merchantId = merchantResponse.data.data.merchantResponseList[0].id;
//     console.log("merchantId",merchantId);
//     const transactionData = await axios.get(
//       `https://proxymomo.onrender.com/api/transaction/v2/transactions?pageSize=100&pageNumber=0&fromDate=2024-11-01T00%3A00%3A00.00&toDate=2024-11-05T23%3A59%3A59.00&dateId=THIS_MONTH&status=ALL&merchantId=${merchantId}&language=vi`,
//       {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       }
//     );
    
//     const totalSuccessAmount =
//       transactionData?.data?.data?.content;
//       console.log('nghi',totalSuccessAmount);
//     return {
//       amount: totalSuccessAmount,
//     };
//   } catch (error) {
//     console.error("Lỗi Nghi Ơi:", error);
//     return { amount: 0 };
//   }
// };
const loginAndGetAmount = async (username, password) => {
  const getMerchantUrl = "https://proxymomo.onrender.com/api/profile/v2/merchants?language=vi";
  const data = { username, password };

  try {
    const response = await axios.post(
      "https://proxymomo.onrender.com/api/authentication/login?language=vi",
      data,
      { timeout: 10000 } // Thời gian chờ là 10 giây
    );

    const token = response.data.data.token;
    //console.log("token",token);
    
    const merchantResponse = await axios.get(getMerchantUrl, {
      headers: { Authorization: "Bearer " + token },
      timeout: 10000 // Thời gian chờ là 10 giây
    });

    const merchantId = merchantResponse.data.data.merchantResponseList?.[0]?.id;
    //console.log("idQr",merchantId);

    const transactionData = await axios.get(
      `https://proxymomo.onrender.com/api/transaction/v2/transactions?pageSize=100&pageNumber=0&fromDate=${fromDate}T00%3A00%3A00.00&toDate=${toDate}T23%3A59%3A59.00&dateId=THIS_MONTH&status=ALL&merchantId=${merchantId}&language=vi`,
      {
        headers: { Authorization: "Bearer " + token },
        timeout: 10000 // Thời gian chờ là 10 giây
      }
    );

    const totalSuccessAmount = transactionData?.data?.data?.content|| [];
    //console.log("Dữ liệu giao dịch:", totalSuccessAmount);

    return { amount: totalSuccessAmount };
  } catch (error) {
    console.error("Lỗi trong loginAndGetAmount:", error.message || error);
    return { amount: 0 };
  }
};


const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    currentUsername = username;
    currentPassword = password;
    
    const { amount } = await loginAndGetAmount(username, password);
    await getGoogleSheet(amount);

    // Xóa interval nếu đã có
    if (intervalId) {
        clearInterval(intervalId);
    }
    
    // Gọi hàm cập nhật dữ liệu mỗi 30 giây
    intervalId = setInterval(() => updateDataEvery30Seconds(),10000);

    return res.send('Đăng nhập thành công!');
};

// Hàm cập nhật dữ liệu mỗi 30 giây
const updateDataEvery30Seconds = async () => {
    const { amount } = await loginAndGetAmount(currentUsername, currentPassword);
    await getGoogleSheet(amount);
};

// Hàm ghi dữ liệu vào Google Sheet
const getGoogleSheet = async (amount) => {
    try {
        const doc = new GoogleSpreadsheet(SHEET_ID);
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY.replace(/\\n/g, '\n'), // Thay thế \n bằng dòng mới
        });
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        const existingTransactionIds = rows.map(row => row['ID giao dịch']);

        const newTransactions = (amount.filter(transaction =>
            transaction.status === 'SUCCESS' && !existingTransactionIds.includes(transaction.id))).reverse();

        if (newTransactions.length === 0) {
            console.log('Không có giao dịch mới để ghi vào Google Sheet.');
            return;
        }

        const rowsToAdd = newTransactions.map(transaction => {
            const formattedDate = moment(transaction.createdDate).format("HH:mm DD/MM/YYYY");
            return {
                "ID giao dịch": transaction.id,
                "Tên thương hiệu": transaction.storeName,
                "Số tiền giao dịch": transaction.totalAmount,
                "Tên khách hàng": transaction.customerName,
                "Số điện thoại khách hàng": transaction.customerPhoneNumber,
                "Trạng thái": transaction.statusDescription,
                "Thời gian": formattedDate
            };
        });

        await sheet.addRows(rowsToAdd);
        console.log('Ghi dữ liệu vào Google Sheet thành công!');
    } catch (e) {
       // console.error("Lỗi khi ghi vào Google Sheet:", e);
    }
};

module.exports = {
    getHomepage,
    getGoogleSheet,
    handleLogin
};
