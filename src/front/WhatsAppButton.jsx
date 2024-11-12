const WhatsAppButton = () => {
  return (
      <a 
          href='https://wa.me/+54913512093342' 
          className="fixed bottom-4 right-4 z-50"
          target="_blank" 
          rel="noopener noreferrer"
      >
          <img src="https://www.gridwebengine.com/user_content/img/img_fab1.svg?6172" 
               alt="WhatsApp" 
               className="w-12 h-12"
          />
      </a>
  );
};

export default WhatsAppButton;