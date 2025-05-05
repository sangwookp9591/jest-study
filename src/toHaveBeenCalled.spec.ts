import { sum, obj } from './toHaveBeenCalled';

test('sum 함수가 호출되었다', () => {
    const sumSpy = jest.fn(sum); //함수 자체에는 내가 몇번 호출되었는지 내가 누구랑 호출되었는지 확인하는 기능이 없음.
    // Fn을 붙인애들은 spy를 붙여준다. sum함수의 행동을 몰래 감시 몇번 호출되었고, 어떤인수를 썻는지
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalled(); //실무에는 많이 안씀, 대체함수를 쓰는게 나음
});

test('sum 함수가 1번 호출되었다', () => {
    const sumSpy = jest.fn(sum); //함수 자체에는 내가 몇번 호출되었는지 내가 누구랑 호출되었는지 확인하는 기능이 없음.
    // Fn을 붙인애들은 spy를 붙여준다. sum함수의 행동을 몰래 감시 몇번 호출되었고, 어떤인수를 썻는지
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalledTimes(1); //정확하게 한번 호출되었는지 확인가능.
});

test('sum 함수가 1,2,와 함께 호출되었다', () => {
    const sumSpy = jest.fn(sum); //함수 자체에는 내가 몇번 호출되었는지 내가 누구랑 호출되었는지 확인하는 기능이 없음.
    //fn을  몇번호출했는지 장치 삽입, Fn을 붙인애들은 spy를 붙여준다. sum함수의 행동을 몰래 감시 몇번 호출되었고, 어떤인수를 썻는지
    sumSpy(1, 2);
    expect(sumSpy).toHaveBeenCalledWith(1, 2); //어떤 인수와 함께 호출되었는지
});

//-- spy함수를 두가지 만드는 법
//spyOn은 기존 obj.minus라는 함수에 spy를 심는거, Jest.fn은 직접 함수를 만드는것
//spyOn은 obj minus를 변형, fn는 원본을 유지하면서 새로운 함수를 만드는 것
test('obj.minus 함수가 1번 호춟되었다. (fn, spy함수 생성)', () => {
    const minusSpy = jest.fn(obj.minus);
    minusSpy(2, 1);
    expect(minusSpy).toHaveBeenCalledTimes(1);
});

test('obj.minus 함수가 1번 호출되었다. (spyOn, spy 삽입)', () => {
    jest.spyOn(obj, 'minus');
    const result = obj.minus(2, 1);

    console.log(obj.minus);

    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(1);
});
