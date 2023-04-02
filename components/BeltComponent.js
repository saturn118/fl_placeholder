export default function BeltComponent(name, width = 120) {
  return <img className="" width={width} src={BeltPath(name)}></img>;
}

export function BeltPath(name) {
  if (!name.includes("belt_")) {
    name = "belt_" + name;
  }
  return "/belts/" + name + ".png";
}
