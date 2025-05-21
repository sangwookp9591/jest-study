import { timer } from './callback';

test('타이머 잘 실행되나?', () => {
    timer((message: string) => {
        expect(message).toBe('success');
    });
    //jest는 jest특성상 settimeout 3초를 못기다려줌 그래서 tobe('failure)도 같이 성공했다는 결과가나옴
});

test('타이머 잘 실행되나? 2', (done) => {
    timer((message: string) => {
        expect(message).toBe('success');
        done();
    });
    //done이라는 함수 매개변수가 있는데 이렇게 테스트를 멈추고 싶을 때 done을 넣어야지만 callback함수를 알수있느음.
});

test('시간아 빨리가라!', (done) => {
    //jest에서는 5초를 테스트가 넘기면 에러가 나버림 이럴때 runAllTimers 시간을빨리감아서 문제해결
    jest.useFakeTimers();
    timer((message: string) => {
        expect(message).toBe('success');
    });

    // jest.runAllTimers();
    jest.advanceTimersByTime(10_000); //10초 흐르게
});
