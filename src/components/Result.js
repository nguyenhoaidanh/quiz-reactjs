import React, { Component } from 'react';
class Result extends Component {
    render() {
        var {total}=this.props;
        return (
            
            <div>
                <div className="result">
                    <h2>Chúc mừng bạn đã hoàn thành .</h2>
                    <h3>Bạn đã đúng {total} câu hỏi của chúng tôi. Kết quả của bạn đã được lưu lại. Nếu điểm cao
                    sẽ có trong bảng xếp hạng ở trang chủ đó nhé. </h3>
                 
                </div>
            </div>
        );
    }
}

export default Result;