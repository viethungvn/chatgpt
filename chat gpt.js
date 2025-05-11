const apiKey = 'org-pZzqXzDPdPo94h1tKW8CtzED';  // Thay YOUR_API_KEY bằng API Key của bạn

// Hàm gửi yêu cầu đến API của OpenAI
async function getGPTResponse(message) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003', // Hoặc model bạn muốn sử dụng, ví dụ text-davinci-003
      prompt: message,  // Nội dung câu hỏi người dùng gửi
      max_tokens: 150,  // Giới hạn số lượng từ trong câu trả lời
      temperature: 0.7,  // Độ sáng tạo của câu trả lời
    }),
  });

  const data = await response.json();
  return data.choices[0].text;  // Trả về câu trả lời của GPT
}

// Xử lý khi người dùng gửi câu hỏi
document.getElementById('sendButton').addEventListener('click', async () => {
  const userMessage = document.getElementById('userInput').value;
  if (userMessage) {
    // Hiển thị câu hỏi của người dùng
    document.getElementById('chatbox').innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    
    // Lấy câu trả lời từ GPT
    const gptResponse = await getGPTResponse(userMessage);
    
    // Hiển thị câu trả lời của GPT
    document.getElementById('chatbox').innerHTML += `<div class="gptResponse"><strong>GPT:</strong> ${gptResponse}</div>`;
    
    // Cuộn xuống cuối chatbox
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;

    // Xóa nội dung nhập liệu sau khi gửi
    document.getElementById('userInput').value = '';
  }
});
