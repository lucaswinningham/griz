class ContactMailer < ActionMailer::Base
  default to: ENV['GMAIL_USERNAME']
  
  def contact_email address, message
    @address = address
    @message = message
    mail(from: @address, subject: 'New Message from Griz User')
  end
end
