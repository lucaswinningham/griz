class ContactMailer < ActionMailer::Base
  default from: ENV['gmail_username']
  
  def contact_email body
    @body = body
    mail(to: ENV['gmail_username'], subject: 'New Contact')
  end
end
