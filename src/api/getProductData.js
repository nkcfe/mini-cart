// 데이터를 받아오는 함수
const request = async (url) => {
  try {
    // fetch()실행
    const response = await fetch(url);
    // 정상적으로 데이터를 받을 경우 데이터 생성
    if (response.ok) {
      const data = response.json();
      return data;
    }
    // 에러데이터일 경우
    const errdata = await response.json();
    throw errdata;
  } catch (e) {
    // 에러 핸들링
    console.log(e);
  }
};

// 데이터 가져오기
const getProductData = async () => {
  const result = await request('./api/productData.json');
  return result;
};

export default getProductData;
