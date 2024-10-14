import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { turnOnDark, turnOnLight } from "../redux/darkmode/darkmodeSlice";
import User from "./header/dropdownAvatar";
export default function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return (
    <Navbar className="">
      <NavbarBrand>
        <p className="font-bold text-inherit">SHOP NERMAL</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="success"
            href="#"
            variant="flat"
            onClick={() => dispatch(turnOnLight())}
          >
            Light
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="success"
            href="#"
            variant="flat"
            onClick={() => dispatch(turnOnDark())}
          >
            Dark
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {isAuthenticated ? (
          <User></User>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
