import { after3days } from './date';

test('3일 후를 리턴한다', () => {
    // const date = new Date();
    // date.setDate(date.getDate() + 3);
    // expect(after3days()).toBe(date);
    // 이렇게하면 1/1000초 차이가 난다. 자바스크립트도 실행시간이 있기 때문에 이래서 가짜 timer를 붙여야함.

    //
    jest.useFakeTimers().setSystemTime(new Date(2025, 4, 21)); //이 코드가 실행된 다음부터는 타이머를 마음대로 바꿔 버림

    console.log(new Date());
    expect(after3days()).toStrictEqual(new Date(2025, 4, 24));
});

afterEach(() => {
    jest.useRealTimers(); //useFakeTimers를 사용하면 앞으로도 계속 가짜 시간이 되어있기때문에 돌려줘야함.
});

test('부동 소수점 문제 테스트', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
    //0.1과 0.2는 이진수로 정확히 표현할 수 없는 소수
    //원래는 부동소수점 문제로 인해서 0.1+0.2는 0.30000000000000004로 나온다.
    /**
     * 자바스크립트는 모든 숫자를 IEEE 754 표준의 64비트 부동소수점(double precision float) 으로 처리합니다.

그런데 문제는...
10진수 0.1 → 2진수로 바꾸면 끝없이 반복되는 무한소수입니다.

0.1 (10진수) ≈ 0.00011001100110011... (2진수, 무한 반복)

0.2 도 마찬가지로 정확히 표현할 수 없습니다.

그래서 자바스크립트는 이런 소수를 내부에서 근사값으로 저장하고 계산합니다.
     */
});
