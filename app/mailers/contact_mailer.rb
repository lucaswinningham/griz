class ContactMailer < ActionMailer::Base
  default to: ENV['GMAIL_USERNAME']
  default from: ENV['GMAIL_USERNAME']
  
  def contact_email body
    @body = body
    mail(subject: 'New Message from Griz User')
  end
end
