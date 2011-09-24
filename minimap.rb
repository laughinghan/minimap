require 'sinatra'
require 'erubis'
require 'open-uri'
require 'nokogiri'

#templates are just in .
set :views, File.dirname(__FILE__)

get '/' do
  @url = request.query_string
  erb @url.empty? ? :minimap : :iframe
end

get '/dev' do
  @dev = true
  @url = request.query_string
  erb @url.empty? ? :minimap : :iframe
end

get '/proxy' do
  address = URI.unescape(request.query_string)
  if address[0..6] != 'http://'
    address = 'http://' + address
  end
  doc = Nokogiri::HTML(open(address))
  elements = doc.css('*')
  elements.each do |element|
    href = element['href']
    if href != nil && href[0] == '/'
      element['href'] = address + href
      # for url()s within external stylesheets.
      if element['type'] == 'text/css'
        element['href'] = '/proxy/' + URI.escape(element['href'])
      end
    end
    src = element['src']
    if src != nil && src[0] == '/'
      element['src'] = address + src
    end
  end
  p doc.to_s
  doc.to_s.gsub('url(/', 'url(' + address + '/')
end