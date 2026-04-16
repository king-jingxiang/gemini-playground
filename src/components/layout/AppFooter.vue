<script setup lang="ts">
</script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p class="copyright">
        © 2025 Gemini Playground · 
        <a href="https://github.com" target="_blank" rel="noopener">
          GitHub
        </a>
      </p>
      <p class="disclaimer">
        本工具仅供测试和学习使用，请勿用于商业用途
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
}

.copyright {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.copyright a {
  color: var(--color-primary);
}

.disclaimer {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin: var(--spacing-xs) 0 0;
}
</style>
