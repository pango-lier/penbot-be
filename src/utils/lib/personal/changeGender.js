//-----------Gioi tinh
const URL_CHANGE_GENDER = "https://myaccount.google.com/gender";
const WOMEN = "#c2";
const MEN = "#c3";

const changeGender = async (page, gender) => {
  try {
    console.log("------changeGender", gender);
    let selectorGender;
    switch (gender) {
      default:
        selectorGender = WOMEN;
        break;
      case 1:
        selectorGender = MEN;
        break;
    }
    await page.goto(URL_CHANGE_GENDER);
    await page.delay(2);
    await page.click(selectorGender);
    await page.delay(6);
  } catch (e) {
    console.log(e.message + " . " + page.location);
  }
};

module.exports = changeGender;
