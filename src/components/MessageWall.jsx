import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const MessageWall = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState({ name: '', content: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3001/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data.reverse())
      }
    } catch (error) {
      console.error('获取留言失败:', error)
      // 如果API不可用，使用默认留言
      setMessages([
        {
          id: 1,
          name: '示例用户',
          content: '祝福新人百年好合！',
          createdAt: new Date().toISOString(),
        },
      ])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newMessage.name.trim() || !newMessage.content.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newMessage,
          createdAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setNewMessage({ name: '', content: '' })
        fetchMessages()
      } else {
        throw new Error('提交失败')
      }
    } catch (error) {
      console.error('提交留言失败:', error)
      // 如果API不可用，仍然添加到本地显示
      const newMsg = {
        id: Date.now(),
        ...newMessage,
        createdAt: new Date().toISOString(),
      }
      setMessages(prev => [newMsg, ...prev])
      setNewMessage({ name: '', content: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="messages" ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-elegant">
            Message Wall
          </h2>
          <p className="text-rose-gold-600 text-lg">祝福留言墙</p>
        </motion.div>

        {/* 留言表单 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-cream-50 to-rose-gold-50 rounded-2xl shadow-xl p-6 md:p-8 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="您的姓名"
              value={newMessage.name}
              onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-colors"
              required
            />
            <textarea
              placeholder="写下您的祝福..."
              value={newMessage.content}
              onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-gold-500 focus:outline-none transition-colors resize-none"
              required
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-rose-gold-400 to-rose-gold-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
            >
              {isSubmitting ? '提交中...' : '发布留言'}
            </motion.button>
          </form>
        </motion.div>

        {/* 留言列表 */}
        <div className="grid md:grid-cols-2 gap-6">
          {messages.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500 py-12">
              还没有留言，快来留下第一条祝福吧！
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-rose-gold-400"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold-400 to-rose-gold-600 flex items-center justify-center text-white font-bold">
                    {message.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{message.name}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{message.content}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default MessageWall

