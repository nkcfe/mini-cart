const MAX_COUNT = 10;
const MIN_COUNT = 1;

// 선언적 방식으로 코딩
class CartList {
  //target : 렌더링할 장소, initialData : 데이터
  constructor($target, initialData) {
    this.$target = $target;
    // ul 태그 생성
    this.$container = document.createElement('ul');
    this.$container.className = 'divide-y divide-gray-200';
    // 금액 합계
    this.$totalCount = document.getElementById('total-count');
    this.state = initialData;
    // target에 container 붙히기
    this.$target.append(this.$container);
    this.render();
  }

  // 상태 저장
  setState(newState) {
    this.state = newState;
    this.render();
  }

  // 장바구니에 아이템 추가
  addCartItem(productData) {
    let newState;
    const clickedProductId = productData.id;
    const checkedIdx = this.state.findIndex(
      (item) => item.id === clickedProductId
    );
    // findIndex()로 찾을 수 없는 index인 경우 제품 추가
    if (checkedIdx === -1) {
      newState = [...this.state, { ...productData, count: 1 }];
      // 기존 있던 상품 수량 추가
    } else {
      newState = [...this.state];
      if (newState[checkedIdx].count < MAX_COUNT) {
        newState[checkedIdx].count += 1;
      } else {
        alert(`장바구니에 담을 수 있는 최대 수량은 ${MAX_COUNT}개입니다.`);
      }
    }
    this.setState(newState);
  }

  // 수량 추가
  increaseCartItem(id) {
    const newState = [...this.state];
    const checkedIdx = this.state.findIndex((item) => item.id === id);
    if (newState[checkedIdx].count < MAX_COUNT) {
      newState[checkedIdx].count += 1;
    } else {
      alert(`장바구니에 담을 수 있는 최대 수량은 ${MAX_COUNT}개입니다.`);
    }
    this.setState(newState);
  }

  // 수량 삭제
  decreaseCartItem(id) {
    const newState = [...this.state];
    const checkedIdx = this.state.findIndex((item) => item.id === id);
    if (newState[checkedIdx].count > MAX_COUNT) {
      newState[checkedIdx].count -= 1;
    } else {
      alert(`장바구니에 담을 수 있는 최소 수량은 ${MIN_COUNT}개입니다.`);
    }

    this.setState(newState);
  }

  // 상품 삭제
  removeCartItem(id) {
    const newState = this.state.filter((item) => item.id !== id);
    this.setState(newState);
  }

  // 로컬에 저장
  saveToLocalStorage() {
    localStorage.setItem('cartState', JSON.stringify(this.state));
  }

  // 렌더링
  render() {
    // 합산 금액 계산
    this.$totalCount.innerHTML = `${this.state
      .reduce((acc, cur) => acc + cur.price * cur.count, 0)
      .toLocaleString()}원`;

    this.$container.innerHTML = this.state
      .map((item) => {
        return `<li class="flex py-6" id=${item.id}>
          <div
            class="h-24 w-24 overflow-hidden rounded-md border border-gray-200"
          >
            <img
              src=${item.imgSrc}
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div class="ml-4 flex flex-1 flex-col">
            <div>
              <div
                class="flex justify-between text-base font-medium text-gray-900"
              >
                <h3>${item.name}</h3>
                <p class="ml-4">${(
                  item.price * item.count
                ).toLocaleString()}원</p>
              </div>
            </div>
            <div class="flex flex-1 items-end justify-between">
              <div class="flex text-gray-500">
                <button class="decrease-btn">-</button>
                <div class="mx-2 font-bold">${item.count}개</div>
                <button class="increase-btn">+</button>
              </div>
              <button
                type="button"
                class="font-medium text-sky-400 hover:text-sky-500"
              >
                <p class="remove-btn">삭제하기</p>
              </button>
            </div>
          </div>
        </li>`;
      })
      .join(''); // join함수로 하나의 문자열로 합치기.
  }
}

export default CartList;
