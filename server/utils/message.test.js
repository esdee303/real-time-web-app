const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Jenny form the block';
        var text = 'I\'m still Jenny from the block';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () => {
   it('should generate correct location object', () => {
       var from = 'Deb';
       var lattitude = 15;
       var longitude = 19;
       var url = 'https://www.google.com/maps?q=15,19';
       var message = generateLocationMessage(from, lattitude, longitude);

       expect(typeof message.createdAt).toBe('number');
       expect(message).toMatchObject({from, url});
   });
});