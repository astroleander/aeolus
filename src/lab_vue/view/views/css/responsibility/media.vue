<template>
  <article class="no-padding">
    <section class="fullscreen">
      <hgroup>
        <header>media</header>
      </hgroup>
      <div>div 1</div>
      <div>div 2</div>
      <div>div 3</div>
      <div>div 4</div>
    </section>
    <section class="fullscreen">
      <hgroup>
        <header>media screen</header>
        <p lang='zh'>
          screen 实质上是一个 media 控制项，其它的控制项包括了
          <code>all</code>
          <code>barille</code>
          <code>embossed</code>
          <code>handheld</code>
          <code>print</code>
          <code>projection</code>
          <code>screen</code>
          <code>speech</code>
          <code>tty</code>
          <code>tv</code>
          详细的内容参看下面的内容
          <a href="https://www.w3.org/TR/CSS2/media.html">CSS2</a>
          <a href="https://drafts.csswg.org/css-conditional-3/#at-ruledef-media">CSS3</a>
          <br/>
          print 模式的效果需要在打印预览里才能看到（勾选背景以确保生效）
        </p>
      </hgroup>
    </section>
    <section class="fullscreen">
      <hgroup>
        <header>media only screen</header>
        The keyword <code>only</code> provided by media queries is intended to hide media queries from older browsers.
        Like <code>not</code>, the keyword must come at the biginning of the declaeration.

        Browsers that don't recognize media queries expect a comma-separated list of media types, and the
        specification says they <strong>should</strong> truncate each value immediately before the first nonalphanumeric
        character that isn't hyphen. So, an old browser <strong>should</strong> interpret the preceding example as this:

        <pre class="code">
          media="only"
        </pre>

      </hgroup>
    </section>
  </article>
</template>

<script>
export default {

}
</script>

<style>

</style>

<style lang="scss" scoped>
header {
  font-size: 2em;
  font-weight: bold; 
}
section {
  &:first-child {
    background: repeating-linear-gradient(
      45deg,
      rgba(18, 187, 41, 0.329) 0, rgba(18, 187, 41, 0.329) 15px,
      transparent 15px, transparent 30px 
    );
    @media (max-width: 632px) {
      & {
        background: repeating-linear-gradient(
          135deg,
        rgba(18, 187, 41, 0.777) 0, rgba(18, 187, 41, 0.777) 15px,
          transparent 15px, transparent 30px 
        );
      }
    };
  }
  &:nth-child(2) {
    background: repeating-linear-gradient(
      45deg,
      transparent 0px, transparent 15px,
      rgba(187, 18, 41, 0.666) 15px, rgba(187, 18, 41, 0.666) 30px,
    );
    @media screen and (max-width: 632px){
      & {
        background: repeating-linear-gradient(
        135deg,
        transparent 0px, transparent 15px,
        rgba(187, 18, 41, 0.666) 15px, rgba(187, 18, 41, 0.666) 30px,
        );
      }
    }
    @media print {
      & {
        background: repeating-linear-gradient(
          135deg,
          transparent 0px, transparent 15px,
        rgba(187, 188, 41, 0.666) 15px, rgba(187, 188, 41, 0.666) 30px,
        );
      }
    }
  }
  &:nth-child(3) {
    background: repeating-linear-gradient(
      45deg,
      rgba(18, 41, 187, 0.329) 0, rgba(18, 41, 187, 0.329) 15px,
      transparent 15px, transparent 30px,
    );
     @media only screen and (min-width: 700px){
      & {
        background: 
        repeating-linear-gradient(
          135deg,
          transparent 0px, transparent 15px,
        rgba(187, 18, 41, 0.329) 15px, rgba(187, 18, 41, 0.329) 30px,
        ),
        repeating-linear-gradient(
          45deg,
        rgba(18, 41, 187, 0.329) 0, rgba(18, 41, 187, 0.329) 15px,
          transparent 15px, transparent 30px,
    );
      }
    }
  }
}
hgroup {
  background: white;
  padding: 5px;
}

</style>
