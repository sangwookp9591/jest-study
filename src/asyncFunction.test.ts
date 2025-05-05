import * as fns from './asyncFunction';

test('okPromise 테스트', () => {
    const okSpy = jest.fn(fns.okPromise).mockResolvedValue('ok');
    return expect(okSpy()).resolves.toBe('no');
    //promise고 앞에 resolves를 쓰고있으면 앞에 무조건 return을 붙여야한다.
});

test('okPromise 테스트2', () => {
    const okSpy = jest.fn(fns.okPromise);
    return okSpy().then((result) => {
        expect(result).toBe('ok');
    }); //promise할때는 항상 return을 붙여야 resolve 될때까지 기다려줌.
});

test('noPromise 테스트', () => {
    const noSpy = jest.fn(fns.noPromise);
    return noSpy().catch((result) => {
        expect(result).toBe('no');
    });
});

test('noPromise 테스트2', () => {
    const noSpy = jest.fn(fns.noPromise).mockRejectedValueOnce('no');
    return expect(noSpy()).rejects.toBe('no');
});

//async await일때는 return을 안해도된다. 실패시는 try catch안에서 해야함.
test('okPromise 테스트3 ', async () => {
    const okSpy = jest.fn(fns.okPromise);
    const result = await okSpy();
    expect(result).toBe('ok');
});

test('noPromise 테스트3 ', async () => {
    const noSpy = jest.fn(fns.noPromise);
    try {
        const result = await noSpy();
    } catch (err) {
        expect(err).toBe('no');
    }
});
