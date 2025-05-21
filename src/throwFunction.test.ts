import { error, customeError, CustomError } from './throwFunction';

test('error가 잘 난다', () => {
    // expect(error()).toThrow(Error);
    //typescript 코드이기 때문에 error()여기 자체에서 에러가 발생해서 toThrow전에 에러가 발생한다.
    // 그함수가 error를 throw하면 그함수를 바로 넣는게 아니라 () => error() 이렇게 감싸서 넣어야한다.

    expect(() => error()).toThrow(Error);
});

test('error가 잘 난다 (try/catch)', () => {
    try {
        error();
    } catch (err) {
        expect(err).toStrictEqual(new Error());
    }
    expect(() => customeError()).toThrow(Error);
});
