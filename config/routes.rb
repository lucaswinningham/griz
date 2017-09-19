Rails.application.routes.draw do
  root 'pages#home'
  
  post :emails, to: 'emails#send_email'
end
