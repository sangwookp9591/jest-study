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
