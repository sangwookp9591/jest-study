import { obj } from './toMatchObject';

test('class 비교는 toMatchObject로 해야 한다', () => {
    expect(obj('hello')).toMatchObject({ a: 'hello' });
    // toStrictEqual는 클래스로 받는것에 사용못함
    // 객체 모양은 같아도 생성자가 다르면 toMatchObject를 사용
});
