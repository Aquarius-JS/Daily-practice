function test(name: string): string {
  return name;
}

function getName(name: Parameters<typeof test>[0]): ReturnType<typeof test> {
  return test(name);
}
