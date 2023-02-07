export default function BeltComponent(name, width = 120) {
  let beltPath = "/belts/" + name + ".png";
  return <img className="" width={width} src={beltPath}></img>;
}
