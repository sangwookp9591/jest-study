import { obj } from './mockFunction';

test('obj.minus가 스파이를 심고 실행도 안되게', () => {
    jest.spyOn(obj, 'minus').mockImplementation(); //mockImplementation 빈값을 입력해는것
    /**
     * mockImplementation안에는 이렇게 생겼음.
     * mockImplementation(()=>{})
     * obj.minus라는 메서드를 () => {} 빈함수로 갈아끼우는거임
     */
    const result = obj.minus(2, 1);
    console.log(obj.minus);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).not.toBe(1);
});

test('obj.minus가 스파이를 심고 리턴값을 바꾸게', () => {
    jest.spyOn(obj, 'minus').mockImplementation(() => 5); //mockImplementation 함수의 결과를 5로 갈아끼움
    const result = obj.minus(2, 1);
    console.log(obj.minus);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(5);
    //결과가 2-1인 1로 나와야하는데 5로나온게 success가 됨
});
