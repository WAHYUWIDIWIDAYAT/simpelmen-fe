import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
const ChatAdmin = (props) => {
  return (
    <div className="chat-wrapper-admin">
      <div className="chat-field-admin">
        <div className="relative max-w-[87%]">
          <div className="customer-chat-field">
            <div className="customer-chat-wrapper">
              {/* message */}
              <div className="text-left">
                <div className="relative break-words whitespace-pre-wrap">
                  <span className="select-text">
                    <span className="text-[15px] text-white">{props.msg}</span>
                  </span>
                  <span className="chat-space"></span>
                </div>
              </div>
              {/* time */}
              <div className="time-chat-wrapper">
                <div className="whitespace-nowrap">
                  <span className="time-chat">{props.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatCustomer = (props) => {
  return (
    <div className="chat-wrapper-customer">
      <div className="chat-field-customer">
        <div className="relative max-w-[87%]">
          <div className="admin-chat-field">
            <div className="admin-chat-wrapper">
              {/* message */}
              <div className="text-left">
                <div className="relative break-words whitespace-pre-wrap">
                  <span className="select-text">
                    <span className="text-[15px] text-white">{props.msg}</span>
                  </span>
                  <span className="chat-space"></span>
                </div>
              </div>
              {/* time */}
              <div className="time-chat-wrapper">
                <div className="whitespace-nowrap">
                  <span className="time-chat">{props.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalChat = ({ closeModalChat, submitHandling }) => {
  return (
    <>
      <div
        id="chatting"
        className="bg-white w-full h-full"
      >
        {/* header chat */}
        <div className="sticky top-0 inset-x-0 flex items-center shadow-md pl-3 pr-5 py-3 justify-between bg-white">
          <div className="flex items-center gap-3">
            <BsChevronLeft
              className="cursor-pointer"
              onClick={closeModalChat}
            />
            <figure className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://i.ibb.co/7bQQYkX/Rectangle-2.png"
                alt="avatar"
                className="w-full h-full object-cover object-center"
              />
            </figure>
            <p className="text-lg font-semibold">Customer 1</p>
          </div>
          <p className="cursor-pointer text-primary-900 text-sm">Hapus</p>
        </div>
        {/* Content Chat */}
        <div className="h-full overflow-y-scroll px-3 pt-4 pb-36 flex flex-col gap-[9px]">
          <div className="chat-wrapper-admin">
            <div className="chat-field-admin">
              <div className="relative max-w-[87%]">
                <div className="customer-chat-field">
                  <div className="customer-chat-wrapper">
                    {/* message */}
                    <div className="text-left">
                      <div className="relative break-words whitespace-pre-wrap">
                        <span className="select-text">
                          <span className="text-[15px] text-white">P</span>
                        </span>
                        <span className="chat-space"></span>
                      </div>
                    </div>
                    {/* time */}
                    <div className="time-chat-wrapper">
                      <div className="whitespace-nowrap">
                        <span className="time-chat">18:03</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-field-admin">
              <div className="relative max-w-[87%]">
                <div className="customer-chat-field">
                  <div className="customer-chat-wrapper">
                    {/* message */}
                    <div className="text-left">
                      <div className="relative break-words whitespace-pre-wrap">
                        <span className="select-text">
                          <span className="text-[15px] text-white">P</span>
                        </span>
                        <span className="chat-space"></span>
                      </div>
                    </div>
                    {/* time */}
                    <div className="time-chat-wrapper">
                      <div className="whitespace-nowrap">
                        <span className="time-chat">18:03</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ChatCustomer
            msg="Waaliakumsalam, bagaimana pak bisa saya bantu?"
            time="18:04"
          />
          <div className="chat-wrapper-admin">
            <div className="chat-field-admin">
              <div className="relative max-w-[87%]">
                <div className="customer-chat-field">
                  <div className="customer-chat-wrapper">
                    {/* message */}
                    <div className="text-left">
                      <div className="relative break-words whitespace-pre-wrap">
                        <span className="select-text">
                          <span className="text-[15px] text-white">
                            Jadi gini pak...
                          </span>
                        </span>
                        <span className="chat-space"></span>
                      </div>
                    </div>
                    {/* time */}
                    <div className="time-chat-wrapper">
                      <div className="whitespace-nowrap">
                        <span className="time-chat">18:05</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-field-admin">
              <div className="relative max-w-[87%]">
                <div className="customer-chat-field">
                  <div className="customer-chat-wrapper">
                    {/* message */}
                    <div className="text-left">
                      <div className="relative break-words whitespace-pre-wrap">
                        <span className="select-text">
                          <span className="text-[15px] text-white">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Iusto ipsam illo accusamus esse nobis laborum
                            debitis quis minima ratione! Nisi ducimus quam
                            dolore tempore qui molestiae velit, repellendus
                            facere atque!
                          </span>
                        </span>
                        <span className="chat-space"></span>
                      </div>
                    </div>
                    {/* time */}
                    <div className="time-chat-wrapper">
                      <div className="whitespace-nowrap">
                        <span className="time-chat">18:05</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ChatCustomer
            msg="maksudd"
            time="18:05"
          />
          <ChatAdmin
            msg="lah"
            time="18:06"
          />
          <ChatCustomer
            msg="lhah"
            time="18:08"
          />
          <ChatAdmin
            msg="LHAH"
            time="18:08"
          />
          <div className="chat-wrapper-customer">
            <div className="chat-field-customer">
              <div className="relative max-w-[87%]">
                <div className="admin-chat-field">
                  <div className="admin-chat-wrapper">
                    {/* message */}
                    <div className="text-left">
                      <div className="relative break-words whitespace-pre-wrap">
                        <span className="select-text">
                          <span className="text-[15px] text-white">
                            Maaf pak saya lelah, saya mau resign ajah
                          </span>
                        </span>
                        <span className="chat-space"></span>
                      </div>
                    </div>
                    {/* time */}
                    <div className="time-chat-wrapper">
                      <div className="whitespace-nowrap">
                        <span className="time-chat">18:20</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-field-customer">
              <div className="relative max-w-[87%]">
                <div className="admin-chat-field">
                  <div className="admin-chat-wrapper">
                    {/* message */}
                    <div className="text-left">
                      <div className="relative break-words whitespace-pre-wrap">
                        <span className="select-text">
                          <span className="text-[15px] text-white">🙏</span>
                        </span>
                        <span className="chat-space"></span>
                      </div>
                    </div>
                    {/* time */}
                    <div className="time-chat-wrapper">
                      <div className="whitespace-nowrap">
                        <span className="time-chat">18:20</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* send chat */}
        <div className="sticky bottom-0 inset-x-0 bg-white shadow-md">
          <div className="flex items-center w-full p-3 border-t border-gray-300">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            <form
              className="flex items-center w-full"
              onSubmit={submitHandling}
            >
              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 px-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                required
              />
              <button type="submit">
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalChat;
