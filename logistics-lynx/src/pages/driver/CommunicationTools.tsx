import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Send, 
  Plus,
  Search,
  User,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  timestamp: string;
  status: 'unread' | 'read';
  type: 'message' | 'alert' | 'update';
}

const CommunicationTools: React.FC = () => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      from: 'Dispatch',
      subject: 'Route Update',
      content: 'Your route has been updated. Please check the new navigation.',
      timestamp: '10:30 AM',
      status: 'unread',
      type: 'update'
    },
    {
      id: '2',
      from: 'Fleet Manager',
      subject: 'Maintenance Reminder',
      content: 'Your truck is due for maintenance next week.',
      timestamp: '09:15 AM',
      status: 'read',
      type: 'alert'
    },
    {
      id: '3',
      from: 'Customer Service',
      subject: 'Delivery Confirmation',
      content: 'Please confirm delivery of load #1042.',
      timestamp: '08:45 AM',
      status: 'read',
      type: 'message'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState('Dispatch');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Tools</h1>
          <p className="text-gray-600">Stay connected with dispatch and team members</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Call Dispatch
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Message
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Emergency Call</h3>
          <p className="text-sm text-gray-600">24/7 support line</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Text Dispatch</h3>
          <p className="text-sm text-gray-600">Quick updates</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Email Support</h3>
          <p className="text-sm text-gray-600">Detailed reports</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Voice Chat</h3>
          <p className="text-sm text-gray-600">Real-time communication</p>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className={`p-4 hover:bg-gray-50 ${message.status === 'unread' ? 'bg-blue-50' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{message.from}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      message.type === 'alert' ? 'text-red-600 bg-red-50' :
                      message.type === 'update' ? 'text-blue-600 bg-blue-50' :
                      'text-gray-600 bg-gray-50'
                    }`}>
                      {message.type}
                    </span>
                    {message.status === 'unread' && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{message.subject}</h4>
                  <p className="text-sm text-gray-600">{message.content}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Send Message */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Message</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Dispatch">Dispatch</option>
              <option value="Fleet Manager">Fleet Manager</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your message here..."
            />
          </div>
          <div className="flex justify-end">
            <button className="btn-primary flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Contact List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Dispatch</p>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>
            <button className="ml-auto btn-outline">
              <Phone className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Fleet Manager</p>
              <p className="text-sm text-gray-600">Mon-Fri 8AM-6PM</p>
            </div>
            <button className="ml-auto btn-outline">
              <Phone className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Customer Service</p>
              <p className="text-sm text-gray-600">Mon-Fri 9AM-5PM</p>
            </div>
            <button className="ml-auto btn-outline">
              <Phone className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Emergency</p>
              <p className="text-sm text-gray-600">24/7 Hotline</p>
            </div>
            <button className="ml-auto btn-outline">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationTools;
