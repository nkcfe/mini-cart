// 선언적 방식으로 코딩
class ProductList {
  //target : 렌더링할 장소, initialData : 데이터
  constructor($target, initialData) {
    this.$target = $target;
    this.state = initialData;
    this.render();
  }

  // 상태 저장
  setState(newState) {
    this.state = newState;
    this.render();
  }

  // 렌더링
  render() {
    // 데이터가 없을 경우
    if (this.state.length === 0) {
      this.$target.innerHTML = '<h1>상품이 없습니다.</h1>';

      // 데이터가 정상적일 경우 상품 리스트 렌더링
    } else {
      this.$target.innerHTML = this.state
        .map((item) => {
          return `<article id="product-card">
        <div class="rounded-lg overflow-hidden border-2 relative">
          <img
            src=${item.imgSrc}
            class="object-center object-cover"
          />
          <div
            class="hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75"
          >
            <div
              data-productid=${item.id}
              class="hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer"
            >
              장바구니에 담기
            </div>
          </div>
        </div>
        <h3 class="mt-4 text-gray-700">${item.name}</h3>
        <p class="mt-1 text-lg font-semibold text-gray-900">${item.price.toLocaleString()}원</p>
      </article>`;
        })
        .join(''); // join함수로 하나의 문자열로 합치기.
    }
  }
}

export default ProductList;
