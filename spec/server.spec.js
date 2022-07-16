var request = require('request');

describe('calc', ()=>{
  it('should multiply', ()=>{
    expect(2*2).toBe(4)
  })
})

describe('get messages', () => {
  it('should return 200 OK', (done)=>{
    request.get('http://localhost:3000/messages', (error, response)=>{
      console.log(response.statusCode);
      expect(response.statusCode).toEqual(200)
      done();
    })
  })

  it('List should not be Empty', (done)=>{
    request.get('http://localhost:3000/messages', (error, response)=>{
      console.log(JSON.parse(response.body));
      expect(JSON.parse(response.body).length).toBeGreaterThan(0);
      done()
    })
  })
})

describe('get messages from user', ()=>{
  it('should return 200 OK', (done)=>{
    request.get('http://localhost:3000/messages/shubh', (error, response) => {
      expect(response.statusCode).toEqual(200)
      done();
    })
  })

  it('name should be shubh', done => {
    request.get('http://localhost:3000/messages/shubh', (error, response)=>{
      expect(JSON.parse(response.body)[0].name).toEqual('shubh');
      done();
    })
  })
})