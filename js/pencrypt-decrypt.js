/* 前端解密：依赖 CryptoJS（下方会通过 CDN 引入） */
(function () {
  function bindOne(root) {
    const input = root.querySelector('.pm-encrypt-input');
    const btn   = root.querySelector('.pm-encrypt-btn');
    const body  = root.querySelector('.pm-encrypt-body');
    if (!input || !btn || !body) return;

    async function unlock() {
      const pwd = input.value || '';
      const ct  = root.getAttribute('data-ct') || '';
      try {
        const bytes = CryptoJS.AES.decrypt(ct, pwd);
        const text  = bytes.toString(CryptoJS.enc.Utf8);
        if (!text) throw new Error('bad');
        body.style.display = 'block';
        body.innerHTML = text; // 这里展示的是构建阶段注入的内容
        // 隐藏输入区
        input.style.display = 'none';
        btn.style.display   = 'none';
        const tip = root.querySelector('.pm-encrypt-tip');
        if (tip) tip.style.display = 'none';
      } catch (e) {
        alert('密码错误或内容损坏');
      }
    }

    btn.addEventListener('click', unlock);
    input.addEventListener('keydown', e =&gt; { if (e.key === 'Enter') unlock(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.pm-encrypt').forEach(bindOne);
  });
})();
