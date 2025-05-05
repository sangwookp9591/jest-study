import { arr, obj } from './toStrictEqual';

test('toStrictEqual Test', () => {
    expect(obj()).toStrictEqual({ a: 'hello' });
    // 객체는 tobe가아니라 toStrictEqual로 해야함 객체는 == false이기때문에
    // 배열끼리도 toStrictEqual을 써야한다.
    expect(arr()).toStrictEqual([1, 2, 3]);
});
