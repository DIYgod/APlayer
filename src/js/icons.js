const context = require.context('../assets/', false, /\.svg/);
const keys = context.keys();

const Icons = {};

for (let i = 0; i < keys.length; i += 1) {
  const key = keys[i].replace(/-[a-z]/g, i => i.toUpperCase());
  Icons[key] = context(keys[i]);
}

export default Icons;
