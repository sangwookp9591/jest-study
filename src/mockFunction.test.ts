import { obj } from './mockFunction';
/**
 * spy 는 유지되기때문에 이건 자바스크립트라서 위에서 아래로 순차적으로 실행되기 때문에
 * 아래에서  toHaveBeenCalledTimes 는 위의 obj 호출과 같이 중복되기 때문에 에러가 발생
 * 개별적으로 하면 에러가 발생하지 않음.
 *
 * 그래서 spy를 없애야함. 없애는 방법이 3가지가 있음.
 *
 *  1. mockClear() , times, with 초기화 spy함수가 몇 번 실행됐는지 누구하 함께 호출되었는지 , calledWith같은 애들
 *  2. mockReset() , mockClear mockImplemntation(()=>{}) , 빈함수로 만들어버림
 *  3. mockRestore() // 아예 전부 없애버림
 */
let spyFn;
let beforeEachCount = 0;
let afterEachCount = 0;

//밖에 있을때는 바깥에 있는 모든 테스트에 전부 다 적용된다. 헷깔리면 파일을 나누자,
beforeEach(() => {
    console.log('outside beforeEach ', beforeEachCount++);
});
afterEach(() => {
    console.log('outside afterEach ', afterEachCount++);
});
/** describe 사용처
 1. 테스트가 너무 많아서 테스트를 나눠야할때
 2. before, afterEach를 특정 그룹에서만 실행하고 싶을 때
**/
describe('beforeEach/ afterEach 적용', () => {
    beforeEach(() => {
        console.log('beforeEach ', beforeEachCount++);
    });
    afterEach(() => {
        console.log('afterEach ', afterEachCount++);
        jest.restoreAllMocks();
    });
    test('obj.minus가 스파이를 심고 실행도 안되게', () => {
        spyFn = jest.spyOn(obj, 'minus').mockImplementation(); //mockImplementation 빈값을 입력해는것
        /**
         * mockImplementation안에는 이렇게 생겼음.
         * mockImplementation(()=>{})
         * obj.minus라는 메서드를 () => {} 빈함수로 갈아끼우는거임
         */
        const result = obj.minus(2, 1);
        console.log(obj.minus);
        expect(obj.minus).toHaveBeenCalledTimes(1);
        expect(result).not.toBe(1);

        // spyFn.mockRestore();
    });

    test('obj.minus가 스파이를 심고 리턴값을 바꾸게', () => {
        //가짜함수를 만들어서 그런행동을 못하게 봐꿈.
        spyFn = jest.spyOn(obj, 'minus').mockImplementation((a, b) => a + b); //mockImplementation 함수의 결과를 5로 갈아끼움
        const result = obj.minus(2, 1);
        console.log(obj.minus);
        expect(obj.minus).toHaveBeenCalledTimes(1);
        expect(result).toBe(5);
        //결과가 2-1인 1로 나와야하는데 5로나온게 success가 됨
        // spyFn.mockClear();
    });

    afterAll(() => {
        console.log('inside afterAll');
    });
    //  내부의 afterAll은 describe가 끝났을 때 실행이된다.
});

test('obj.minus가 스파이를 심고 리턴값을 바꾸게 mockImplementationOnce', () => {
    //가짜함수를 만들어서 그런행동을 못하게 봐꿈.
    spyFn = jest
        .spyOn(obj, 'minus')
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
    // spyFn.mockRestore();
});

test('obj.minus가 스파이를 심고 리턴값이 다르게 나오게 mockReturnValue', () => {
    spyFn = jest.spyOn(obj, 'minus').mockReturnValueOnce(3).mockReturnValue(5); //함수를 바꿔끼기 보다는 리턴값만 바꿈

    const result1 = obj.minus(2, 1);
    const result2 = obj.minus(2, 1);
    const result3 = obj.minus(2, 1);
    console.log(obj.minus);
    expect(obj.minus).toHaveBeenCalledTimes(3);
    expect(result1).toBe(3);
    expect(result2).toBe(5);
    expect(result3).toBe(1);
    // spyFn.mockRestore();
});

//파일단위
//모든 테스트 실행전에
beforeAll(() => {}); // 데이터 베이스 연결 같은거?
// 매번 실행 전에
// beforeEach(() => {}); //테스트 전에 뭐 변수 초기화 같은거
// //매번 실행 후에
// afterEach(() => {
//     // spyFn.mockRestore();
//     // jest.clearAllMocks(); //위처럼 안해도되게 제스트 자체에서 모든거를 클리어할수있는게 있음. 역할은 같음.
//     // jest.resetAllMocks();
//     jest.restoreAllMocks();
// }); // 정리할때 mockRestore() 같은거
//모든 테스트 실행 후에
afterAll(() => {}); // 모든 테스트가 끝난 후에 beforeAll에서 한거 정리하는 용도로 많이 사용
