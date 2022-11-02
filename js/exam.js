/**
 * INPUT:
 * Họ Tên.
 * Tổng thu nhập mỗi năm.
 * Số người phụ thuộc.
 * PROCESS:
 *  Tính thu nhập chịu thuế = Tổng thu nhập - 4tr - số người phụ thuộc* 1.6tr
 *  Thu nhập chịu thuế <= 60:
 *   Thuế = 60*5%/
 *  Thu nhập chịu thuế > 60 đến <=120:
 *   Thuế = 60*5% + (thu nhập -60)*10/
 *  Thu nhập chịu thuế > 120 đến <=210:
 *   Thuế = 60*5% + 60*10% + (thu nhập - 120)*15%;/
 *  Thu nhập chịu thuế > 210 đến <= 384:
 *   Thuế = 60*5% + 60*10% + 90*15% + (thu nhập -210)*20;/
 *  Thu nhập chịu thuế > 384 đến <=624:
 *   Thuế = 60*5% + 60*10% + 90*15% + 174*20% + (thu nhập -384)*25%;/
 *  Thu nhập chịu thuế >624 đến <=960:
 *   Thuế = 60*5% + 60*10% + 90*15% + 174*20% + 240*25% + (thu nhập -624)*30%;/
 *  Thu nhập chịu thuế >960:
 *   Thuế = 60*5% + 60*10% + 90*15% + 174*20% + 240*25% + 336*30% + (thu nhập - 960)*35%;
 * OUTPUT:
 * in ra số tiền thuế
 */
function handleTaxCaculator() {
  var taxUser = document.getElementById("taxUser").value;
  var taxReduce = document.getElementById("taxReduce").value * 1;
  var income = document.getElementById("totalIncome").value * 1;
  var checkTax = income - 4000000 - taxReduce * 1600000;
  var taxFee = 0;
  var r1 = 60000000; // Mốc 1
  var r2 = 120000000;
  var r3 = 210000000;
  var r4 = 384000000;
  var r5 = 624000000;
  var r6 = 960000000; // Mốc 6
  if (checkTax <= 0) {
    alert("Thu nhập không đủ nuôi thân, khỏi đóng thuế.");
    document.getElementById("totalTax").innerHTML = "0";
  } else if (checkTax > 1000000 && checkTax <= r1) {
    taxFee = checkTax * 0.05;
  } else if (checkTax > r1 && checkTax <= r2) {
    1;
    taxFee = r1 * 0.05 + (checkTax - r1) * 0.1;
  } else if (checkTax > r2 && checkTax <= r3) {
    taxFee = r1 * 0.05 + (r2 - r1) * 0.1 + (checkTax - r2) * 0.15;
  } else if (checkTax > r3 && checkTax <= r4) {
    taxFee =
      r1 * 0.05 + (r2 - r1) * 0.1 + (r3 - r2) * 0.15 + (checkTax - r3) * 0.2;
  } else if (checkTax > r4 && checkTax <= r5) {
    taxFee =
      r1 * 0.05 +
      (r2 - r1) * 0.1 +
      (r3 - r2) * 0.15 +
      (r4 - r3) * 0.2 +
      (checkTax - r4) * 0.25;
  } else if (checkTax > r5 && checkTax <= r6) {
    taxFee =
      r1 * 0.05 +
      (r2 - r1) * 0.1 +
      (r3 - r2) * 0.15 +
      (r4 - r3) * 0.2 +
      (r5 - r4) * 0.25 +
      (checkTax - r5) * 0.3;
  } else {
    taxFee =
      r1 * 0.05 +
      (r2 - r1) * 0.1 +
      (r3 - r2) * 0.15 +
      (r4 - r3) * 0.2 +
      (r5 - r4) * 0.25 +
      (r6 - r5) * 0.3 +
      (checkTax - r6) * 0.3;
  }
  document.getElementById("taxUserName").innerHTML = "Họ tên: " + taxUser;
  document.getElementById("totalTax").innerHTML =
    "Thuế thu nhập cá nhân: " + taxFee + "đ";
  document.getElementById("totalTax").style.backgroundColor = "#47f54d6b";
  document.getElementById("taxUserName").style.backgroundColor = "#47f54d8b";
}
/**
 * INPUT:
 * mã khách hàng.
 * loại khách hàng.
 * số kết nối. (chỉ có ở doanh nghiệp)
 * số kênh cao cấp.
 * PROCESS:
 * Hóa đơn:
 *  Nhà dân: phí xử lý + phí dịch vụ + số kênh cao cấp*phí thuê
 *  => 4.5 + 20.5 + số kênh*7.5
 *  Doanh nghiệp: phí xử lý + (phí dịch vụ + sô kết nối*5) + số kênh cao cấp*phí thuê
 *  => 15 + (75+ số kết nối*5) + số kênh*50
 * Nếu là nhà dân thì sẽ không hiện ô nhập số kết nối
 * OUTPUT:
 * mã khách hàng.
 * loại khách hàng.
 * Tiền thuế
 */
function selectCustomer() {
  var user = document.getElementById("customerType").value;
  var show = document.getElementById("customerConnectUse");
  if (user == 0) {
    show.setAttributeNode(document.createAttribute("disabled"));
    show.style.backgroundColor = "#8080804b";
    show.value = "";
  }
  if (user == 1) {
    show.removeAttribute("disabled");
    show.style.backgroundColor = "#fff";
  }
}
selectCustomer();
function handleCableBill() {
  var userName = document.getElementById("customerID").value;
  var userType = document.getElementById("customerType").value;
  var hiEndChanel = document.getElementById("customerHiEndUsed").value * 1;
  var customerConnectUse =
    document.getElementById("customerConnectUse").value * 1;
  var cableBillInfo = document.getElementById("cableBillInfo");
  var totalCash;
  if (userName == "") {
    alert("Vui lòng nhập mã khách hàng");
    return;
  }
  if (userType == 0) {
    totalCash = 4.5 + 20.5 + hiEndChanel * 7.5;
    cableBillInfo.innerHTML =
      "Mã khách hàng: " + userName + "---- tiền dịch vụ " + totalCash + "$";
  } else {
    totalCash = 15 + (75 + customerConnectUse * 5) + hiEndChanel * 50;
    cableBillInfo.innerHTML =
      "Mã khách hàng: " + userName + ", tiền dịch vụ " + totalCash + "$";
  }
  cableBillInfo.style.backgroundColor = "#47f54d6b";
}
