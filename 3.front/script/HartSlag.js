class HeartRateMonitor {
    constructor(id) {
      this.SERVICE_ID = 0x180D;
      this.CHARACTERISTIC_ID = 0x2A37;
      
      this.hrElement_ = document.getElementsByClassName(id);
      
    }
    
    parseHeartRate_(data) {
      let flags = data.getUint8(0);
      if (flags & 0x1) {
        return data.getUint16(1, true);
      }
      return data.getUint8(1);
    }
  
    onHeartRateChanged_(event) {
      let dataView =  event.target.value;
      let tick = (new Date()).getTime();
      let hr = this.parseHeartRate_(dataView);
      
      // Ignore readings where the HR or last HR value is 0 - treat this as a
      // failed reading from the sensor.
      if (this.lastTick_ && hr && this.lastHr_) {
        this.hrSum_ += (tick - this.lastTick_) * (hr + this.lastHr_);
        this.timeSum_ += tick - this.lastTick_;
      }
      this.lastTick_ = tick;
      this.lastHr_ = hr;
      for(var i = 0; i < this.hrElement_.length; i++) {
        this.hrElement_[i].innerHTML = hr;
    }
    }
  
    handleCharacteristic_(characteristic) {
      characteristic.addEventListener('characteristicvaluechanged',
          event => this.onHeartRateChanged_(event));
      return characteristic.startNotifications();
    }
  
    start() {
      let options = {
        filters: [{
        services: [this.SERVICE_ID]
      }]};
      navigator.bluetooth.requestDevice(options)
          .then(device => {
            return device.gatt.connect();
          })
          .then(server => {
            return server.getPrimaryService(this.SERVICE_ID);
          })
          .then(service => {
            return service.getCharacteristic(this.CHARACTERISTIC_ID);
          })
          .then(characteristic => this.handleCharacteristic_(characteristic))
          .catch(error => {
            console.log('Error: ' + error);
          });
    }
  }