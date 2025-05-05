import { sum } from './toBe';

// test와 expect는 Jest가 전역으로 설정
test('sum 함수는 두 숫자를 더해야 한다', () => {
    expect(sum(1, 2)).toBe(3);
});
