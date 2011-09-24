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
  def absolutify(element, attribute, address)
    at = element[attribute]
    if at != nil && at[0] == '/'
      element[attribute] = address + at
    end
  end
  elements.each do |element|
    absolutify(element,'href',address)
    absolutify(element,'src',address)
    absolutify(element,'action',address)
  end
  doc.to_s.gsub('url(/', 'url(' + address + '/')
end
