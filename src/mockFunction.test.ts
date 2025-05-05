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
    //가짜함수를 만들어서 그런행동을 못하게 봐꿈.
    jest.spyOn(obj, 'minus').mockImplementation((a, b) => a + b); //mockImplementation 함수의 결과를 5로 갈아끼움
    const result = obj.minus(2, 1);
    console.log(obj.minus);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(5);
    //결과가 2-1인 1로 나와야하는데 5로나온게 success가 됨
});

test('obj.minus가 스파이를 심고 리턴값을 바꾸게 mockImplementationOnce', () => {
    //가짜함수를 만들어서 그런행동을 못하게 봐꿈.
    jest.spyOn(obj, 'minus')
        .mockImplementationOnce((a, b) => a + b) //mockImplementationOnce 한번만 가짜행동을 한다.
        .mockImplementationOnce(() => 5);
    //첫 번째 실행하면 once, 두번째 실행하면 .mockImplementation(() => 5), 세번째 실행하면 원래함수로 돌아옴.
    const result1 = obj.minus(2, 1);
    const result2 = obj.minus(2, 1);
    const result3 = obj.minus(2, 1);
    console.log(obj.minus);
    expect(obj.minus).toHaveBeenCalledTimes(3);
    expect(result1).toBe(3);
    expect(result2).toBe(5);
    expect(result3).toBe(1);
});

test('obj.minus가 스파이를 심고 리턴값이 다르게 나오게 mockReturnValue', () => {
    jest.spyOn(obj, 'minus').mockReturnValueOnce(3).mockReturnValue(5); //함수를 바꿔끼기 보다는 리턴값만 바꿈

    const result1 = obj.minus(2, 1);
    const result2 = obj.minus(2, 1);
    const result3 = obj.minus(2, 1);
    console.log(obj.minus);
    expect(obj.minus).toHaveBeenCalledTimes(3);
    expect(result1).toBe(3);
    expect(result2).toBe(5);
    expect(result3).toBe(1);
});
